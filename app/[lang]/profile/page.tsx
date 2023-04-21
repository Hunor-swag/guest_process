// profil elkeszitese nev, email, telefonszam
"use client";
import { createContext } from "react";
import React from "react";

const ProfileContext = createContext(Profile);

function Profile() {
  return (
    <ProfileContext.Provider>
      <div>Profile</div>
    </ProfileContext.Provider>
  );
}

export default Profile;
