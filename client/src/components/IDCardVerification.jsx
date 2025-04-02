import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tesseract from 'tesseract.js';
import { setCurrentUser } from '../redux/user/userSlice';

const IDCardVerification = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [scannedImage, setScannedImage] = useState(null);
  const [detectedNumber, setDetectedNumber] = useState('');
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview the uploaded image
    setScannedImage(URL.createObjectURL(file));
    setIsVerifying(true);
    setVerificationError('');
    setVerificationSuccess(false);
    setDetectedNumber('');

    try {
      // Process the ID card image using Tesseract.js for OCR
      const result = await Tesseract.recognize(
        file,
        'eng',
        { 
          logger: m => console.log(m),
          // Set rectangle to focus on the admission number area (approx)
          rectangle: { top: 150, left: 300, width: 200, height: 50 }
        }
      );

      // Extract text from the scanned image
      const scannedText = result.data.text;
      console.log("Extracted text:", scannedText);
      
      // Look for text after "Admission No." or just for the digit pattern
      // Pattern for BIT admission numbers (10-11 digits)
      let admissionNumberMatch = scannedText.match(/Admission No\.?\s*(\d{10,11})/i);
      
      // If not found with label, try to find any 10-11 digit number
      if (!admissionNumberMatch) {
        admissionNumberMatch = scannedText.match(/\b(\d{10,11})\b/);
      }
      
      if (admissionNumberMatch) {
        // Extract the matched number (group 1 if using labels, group 0 if direct match)
        const scannedAdmissionNumber = admissionNumberMatch[1] || admissionNumberMatch[0];
        setDetectedNumber(scannedAdmissionNumber);
        
        // Compare with the user's admission number
        if (scannedAdmissionNumber === currentUser.admissionNumber) {
          // Update the user's isAuthenticated status in local state
          const updatedUser = {
            ...currentUser,
            isAuthenticated: true
          };
          
          // Update Redux state
          dispatch(setCurrentUser(updatedUser));
          
          // Also update in localStorage to persist the change
          const persistRoot = JSON.parse(localStorage.getItem('persist:root'));
          if (persistRoot) {
            const user = JSON.parse(persistRoot.user);
            user.currentUser = updatedUser;
            persistRoot.user = JSON.stringify(user);
            localStorage.setItem('persist:root', JSON.stringify(persistRoot));
          }
          
          setVerificationSuccess(true);
        } else {
          setVerificationError(`Admission number on ID card (${scannedAdmissionNumber}) does not match your profile (${currentUser.admissionNumber}).`);
        }
      } else {
        setVerificationError('Could not detect a valid admission number on the ID card. Please ensure the number is clearly visible.');
      }
    } catch (error) {
      console.error('ID verification error:', error);
      setVerificationError('Failed to process the ID card. Please try again with a clearer image.');
    } finally {
      setIsVerifying(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const resetVerification = () => {
    setScannedImage(null);
    setVerificationError('');
    setVerificationSuccess(false);
    setDetectedNumber('');
  };

  if (currentUser.isAuthenticated) {
    return (
      <div className="w-full mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span>Your account is verified</span>
      </div>
    );
  }

  return (
    <div className="w-full mb-4">
      <div className="p-4 bg-[#FAF4FE] border border-[#E8D8F3] rounded-xl">
        <h3 className="text-lg font-semibold mb-2">Verify Your Account</h3>
        <p className="text-sm text-gray-600 mb-3">
          Upload your BIT ID card to verify your admission number and authenticate your account.
        </p>
        
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileUpload}
        />
        
        {scannedImage ? (
          <div className="mb-4">
            <div className="flex items-center justify-center mb-3">
              <img 
                src={scannedImage} 
                alt="Uploaded ID Card" 
                className="max-h-48 rounded-lg shadow-sm border border-gray-200" 
              />
            </div>
            
            {detectedNumber && (
              <div className="text-center mb-3">
                <p className="text-sm text-gray-700">Detected Admission Number:</p>
                <p className="font-bold text-lg">{detectedNumber}</p>
              </div>
            )}
            
            <button
              className="w-full p-3 bg-gray-200 text-gray-700 font-bold rounded-xl mb-3"
              onClick={resetVerification}
            >
              Try Another Image
            </button>
          </div>
        ) : (
          <button
            className="w-full p-3 bg-[#6a7cff] text-white font-bold rounded-xl flex justify-center items-center mb-3"
            onClick={triggerFileInput}
            disabled={isVerifying}
          >
            {isVerifying ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              "Upload ID Card"
            )}
          </button>
        )}
        
        {isVerifying && (
          <div className="flex justify-center items-center mb-3">
            <svg className="animate-spin h-8 w-8 text-[#6a7cff]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="ml-2 text-sm text-gray-600">Scanning ID card...</p>
          </div>
        )}
        
        {verificationError && (
          <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {verificationError}
          </div>
        )}
        
        {verificationSuccess && (
          <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Verification successful! Your account is now authenticated.
          </div>
        )}
        
        <div className="mt-4 border-t border-gray-200 pt-3">
          <h4 className="font-medium text-sm mb-2">Guidelines for ID Card Scanning:</h4>
          <ul className="text-xs text-gray-600 list-disc pl-4 space-y-1">
            <li>Ensure the admission number is clearly visible</li>
            <li>Take the photo in good lighting</li>
            <li>Make sure the card is not blurred</li>
            <li>Your ID card is processed locally and is not stored or sent to any server</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IDCardVerification;