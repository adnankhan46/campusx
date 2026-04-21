import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faTimes } from "@fortawesome/free-solid-svg-icons";
import BottomBar from "../../components/constants/Bottombar";
import Navbar from "../../components/constants/Navbar";
import { useAddPostsMutation } from "../../redux/posts/postApi";
import { useNavigate } from "react-router-dom";
import * as nsfwjs from "nsfwjs";

// -- Not using Firebase for Now
// import app from "../../firebase";
// import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

let cachedModel = null; // Global variable to store the loaded model
const MODEL_LOAD_TIMEOUT = 30000; // 30 second timeout

const AddPost = () => {
  const [postContent, setPostContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageMsg, setImageMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [nsfwAlert, setNsfwAlert] = useState(null); // NSFW alert and result
  const [modelStatus, setModelStatus] = useState("idle"); // idle, loading, loaded, error, disabled
  const [modelError, setModelError] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const [addPost, { isLoading, error }] = useAddPostsMutation();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const loadModel = async () => {
    // Return early if already loaded or loading
    if (cachedModel || modelStatus === "loaded" || modelStatus === "loading") {
      return;
    }

    setModelStatus("loading");
    setModelError(null);

    try {
      // Set a timeout promise that rejects after 30 seconds
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Model loading timed out")), MODEL_LOAD_TIMEOUT)
      );

      const nsfwModel = await Promise.race([
        nsfwjs.load("/models/model.json", { size: 299 }),
        timeoutPromise,
      ]);

      cachedModel = nsfwModel;
      setModelStatus("loaded");
      console.log("NSFW Model loaded successfully");
    } catch (err) {
      console.error("Failed to load NSFW Model:", err);
      setModelStatus("error");
      setModelError(err.message || "Failed to load image recognition model");
      // Disable NSFW checking but allow posting
      setModelStatus("disabled");
    }
  };

  const checkImageForNSFW = async (imgFile) => {
    // If model is disabled, skip NSFW check
    if (modelStatus === "disabled") {
      return { isNSFW: false, predictions: [], skipped: true };
    }

    // Load model if not already loaded
    if (!cachedModel && modelStatus !== "loading") {
      await loadModel();
    }

    // If model still not available, skip check
    if (!cachedModel) {
      return { isNSFW: false, predictions: [], skipped: true };
    }

    try {
      const imgElement = document.createElement("img");
      imgElement.src = URL.createObjectURL(imgFile);

      return new Promise((resolve) => {
        imgElement.onload = async () => {
          try {
            setModelStatus("analyzing");
            const predictions = await cachedModel.classify(imgElement);
            // console.log("Predictions:", predictions);

            // Process predictions
            let pornProbability = 0;
            let hentaiProbability = 0;
            let sexyProbability = 0;

            predictions.forEach((pred) => {
              if (pred.className === "Porn") pornProbability = pred.probability;
              if (pred.className === "Hentai")
                hentaiProbability = pred.probability;
              if (pred.className === "Sexy") sexyProbability = pred.probability;
            });

            const isNSFW =
              pornProbability > 0.05 ||
              hentaiProbability > 0.1 ||
              sexyProbability > 0.15;

            setModelStatus("loaded");
            resolve({ isNSFW, predictions, skipped: false });
          } catch (err) {
            console.error("Error classifying image:", err);
            setModelStatus("disabled");
            resolve({ isNSFW: false, predictions: [], skipped: true });
          }
        };

        imgElement.onerror = () => {
          console.error("Failed to load image for NSFW check");
          setModelStatus("disabled");
          resolve({ isNSFW: false, predictions: [], skipped: true });
        };
      });
    } catch (error) {
      console.error("Error during NSFW classification:", error);
      setModelStatus("disabled");
      return { isNSFW: false, predictions: [], skipped: true };
    }
  };

  const handleImageUpload = async (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setNsfwAlert(null); // Clear previous NSFW alert
      const { isNSFW, predictions, skipped } = await checkImageForNSFW(selectedImage);

      if (isNSFW) {
        setNsfwAlert({ isNSFW: true, predictions, skipped });
        setImage(null); // Clear image if inappropriate
      } else {
        setNsfwAlert({ isNSFW: false, predictions, skipped });
        setImage(selectedImage); // Accept the image if it's safe
      }
    }
  };

  const handlePost = async () => {
    if (!postContent) {
      alert("Please enter some text");
      return;
    }
    setLoading(true);
    setNsfwAlert(null); // Clear NSFW alert

    let imageUrl = null;

    if (image) {
      try {
        // const storage = getStorage(app);
        // const storageRef = ref(storage, "images/" + image.name);
        // await uploadBytes(storageRef, image);
        // imageUrl = await getDownloadURL(storageRef);
        // console.log("Image uploaded to:", imageUrl);

        console.log("Image uploaded Service is currently not operational");
        setImageMsg("Image uploaded Service is currently not operational")
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    try {
      await addPost({ text: postContent, postImage: imageUrl }).unwrap();
      setPostContent("");
      setImage(null);
      navigate("/home");
    } catch (err) {
      console.error("Error posting content:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelImage = () => {
    setNsfwAlert(null);
    setImage(null);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#EFEFF4] pb-[120px] font-inter">
      <Navbar />
      <h1 className="text-2xl md:text-4xl font-bold my-4">Add a Post</h1>
      <textarea
        className="w-full md:w-1/2 p-2 h-20 rounded-xl mb-4 border focus:outline-none"
        placeholder="Type something..."
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        ref={inputRef}
      ></textarea>

      <div className="w-full md:w-1/2 mb-4">
        <p>{` Image Upload(Optional)`}</p>
        <label className="flex items-center justify-start p-4 cursor-pointer hover:bg-gray-200 border-2 border-gray-300 rounded-xl">
          <FontAwesomeIcon icon={faUpload} className="text-gray-600 mr-2" />
          <span className="text-gray-600">Upload a meme</span>
          <input
            type="file"
            accept="image/jpeg, image/jpg, image/png"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>

        {modelStatus === "loading" && (
          <p className="text-center text-blue-500">
            Loading Image Recognition Model...
          </p>
        )}
        {modelStatus === "analyzing" && (
          <p className="text-center text-blue-500">Analyzing Image...</p>
        )}
        {modelStatus === "loaded" && (
          <p className="text-green-500 text-center text-sm">
            Image Recognition Model Ready
          </p>
        )}
        {modelStatus === "disabled" && (
          <p className="text-orange-500 text-center text-sm">
            Content moderation unavailable - uploading without check
          </p>
        )}
        {modelStatus === "error" && modelError && (
          <p className="text-orange-500 text-center text-sm">
            {modelError} - you can still upload images
          </p>
        )}

        {modelStatus === "loaded" && image && (
          <div className="mt-2 flex flex-col items-center">
            <p className="text-center text-gray-600">
              Selected file: {image.name}
            </p>
            <img
              src={URL.createObjectURL(image)}
              alt="Selected"
              className="mt-2 max-w-full max-h-36 rounded"
            />
            <button
              className="mt-2 p-2 bg-gray-500 text-white hover:bg-red-600 rounded"
              onClick={handleCancelImage}
            >
              <FontAwesomeIcon icon={faTimes} className="mr-2" />
              Cancel
            </button>
          </div>
        )}

        {image && modelStatus !== "loaded" && (
          <div className="mt-2 flex flex-col items-center">
            <p className="text-center text-gray-600">
              Selected file: {image.name}
            </p>
            <img
              src={URL.createObjectURL(image)}
              alt="Selected"
              className="mt-2 max-w-full max-h-36 rounded"
            />
            <button
              className="mt-2 p-2 bg-gray-500 text-white hover:bg-red-600 rounded"
              onClick={handleCancelImage}
            >
              <FontAwesomeIcon icon={faTimes} className="mr-2" />
              Cancel
            </button>
          </div>)}

        {nsfwAlert && !nsfwAlert.skipped && nsfwAlert.predictions && nsfwAlert.predictions.length > 0 && (
          <div className="text-gray-600 text-center text-sm">
            <h3 className="font-bold">Content Analysis:</h3>
            {nsfwAlert.predictions.map((prediction, index) => {
              const labelMap = {
                Porn: "Explicit Content",
                Hentai: "Animated Explicit Content",
                Sexy: "Suggestive Content",
                Neutral: "Safe Content",
                Drawing: "Illustration",
              };
              const friendlyLabel =
                labelMap[prediction.className] || prediction.className;

              return (
                <p key={index}>
                  {friendlyLabel}: {(prediction.probability * 100).toFixed(2)}%
                </p>
              );
            })}
          </div>
        )}

        {nsfwAlert && nsfwAlert.isNSFW && (
          <div className="text-red-500 text-center mb-4">
            Inappropriate content detected. Please upload a different image.
          </div>
        )}
        {nsfwAlert && !nsfwAlert.isNSFW && !nsfwAlert.skipped && (
          <div className="text-green-500 text-center my-2 text-sm">
            Image Upload service is currently not operational
          </div>
        )}
        {nsfwAlert && nsfwAlert.skipped && (
          <div className="text-blue-500 text-center mb-2 text-sm">
            Image uploaded (moderation check skipped)
          </div>
        )}

      </div>

      <button
        className={`p-4 w-full md:w-1/2 ${isLoading ? "bg-[#c9cfff]" : "bg-[#6a7cff]"
          } text-white rounded-xl`}
        onClick={handlePost}
        disabled={isLoading || loading}
      >
        {loading || isLoading ? "Posting..." : "Post"}
      </button>
      <BottomBar />
    </div>
  );
};

export default AddPost;
