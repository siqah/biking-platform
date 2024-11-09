import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const Profile = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(currentUser?.displayName || "");
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureURL, setProfilePictureURL] = useState(currentUser?.photoURL || "");

  // Upload profile picture and set its URL
  useEffect(() => {
    if (profilePicture) {
      const storage = getStorage();
      const storageRef = ref(storage, `profilePictures/${currentUser.uid}`);

      uploadBytes(storageRef, profilePicture).then(() => {
        getDownloadURL(storageRef).then((url) => {
          setProfilePictureURL(url);
          updateUserProfile(currentUser.uid, { photoURL: url }); // Update Firestore with the new URL
        });
      });
    }
  }, [profilePicture, currentUser?.uid]);

  async function updateUserProfile(userId, profileData) {
    const userRef = doc(db, "users", userId);

    try {
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        await updateDoc(userRef, profileData);
      } else {
        await setDoc(userRef, profileData);
      }
      console.log("User profile updated or created successfully.");
    } catch (error) {
      console.error("Error updating or creating user profile:", error);
    }
  }

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePicture(file);
  };

  const handleSaveChanges = async () => {
    try {
      await updateUserProfile(currentUser.uid, {
        displayName: displayName,
        photoURL: profilePictureURL,
      });
      setIsEditing(false); // Exit edit mode after saving changes
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-8">
        {currentUser ? (
          isEditing ? (
            // Edit Profile Section
            <>
              <div className="flex justify-between items-center">
                <button onClick={() => setIsEditing(false)} className="text-blue-500">
                  Cancel
                </button>
              </div>
              <img
                src={profilePictureURL || "/default-avatar.png"}
                alt="Profile"
                className="w-32 h-32 mx-auto rounded-full my-4"
              />
              <input
                type="file"
                id="profilePicture"
                onChange={handleProfilePictureChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 my-4"
              />
              <button
                onClick={handleSaveChanges}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
            </>
          ) : (
            // View Profile Section
            <>
              <div className="flex justify-between">
                <button className="mr-4 shadow-md rounded-md p-1 text-lg ">
                  <Link to="/">HOME</Link>
                </button>
                <button className="mr-4 shadow-md rounded-md p-2 text-lg ">
                  <Link to="/logout">LOGOUT</Link>
                </button>
              </div>
              <img
                src={profilePictureURL || "/default-avatar.png"}
                alt="Profile"
                className="w-32 h-32 mx-auto rounded-full my-4"
              />
              <h2 className="text-xl font-semibold text-center text-gray-700 mb-1">
                {displayName || "No Name Available"}
              </h2>
              <p className="text-center text-gray-500 mb-4">{currentUser.email}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="w-full py-2 mt-4 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors duration-200"
              >
                Edit Profile
              </button>
            </>
          )
        ) : (
          <p className="text-center text-gray-500">No user information available</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
