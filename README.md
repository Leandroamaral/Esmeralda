# About
This little App works on Android and was developed to be used as scheduler for a services in a beauty salon but can be customizable for any service provider

This was developed with Firebase database and expo framework with React native
 
# Prehequisites 
- Git
- Node.js
- Firebase Cloud access
- Expo

# Instalation

1. Cloning git 
``` 
git clone https://github.com/Leandroamaral/Esmeralda.git
```

2. Install Dependencies
```
cd Esmeralda
npm install
```

3. Create Firebase Project

- Access  [Firebase Console](https://console.firebase.google.com/).
- Create a project
![image1](https://github.com/Leandroamaral/Esmeralda/blob/78a9d5ee6befc49339daf164c21f147f47d6c82b/assets/readme/01.png?raw=true)
- Enter a project name (ex: Esmeralda)
![image2](https://github.com/Leandroamaral/Esmeralda/blob/78a9d5ee6befc49339daf164c21f147f47d6c82b/assets/readme/03.png?raw=true)
- Click Continue
![image3](https://github.com/Leandroamaral/Esmeralda/blob/78a9d5ee6befc49339daf164c21f147f47d6c82b/assets/readme/04.png?raw=true)
![image4](https://github.com/Leandroamaral/Esmeralda/blob/78a9d5ee6befc49339daf164c21f147f47d6c82b/assets/readme/06.png?raw=true)
- Create a firebase App (click WEB in add an app to get started)
![image5](https://github.com/Leandroamaral/Esmeralda/blob/78a9d5ee6befc49339daf164c21f147f47d6c82b/assets/readme/07.png?raw=true)
- Register a app name (ex: Esmeralda)
![image6](https://github.com/Leandroamaral/Esmeralda/blob/78a9d5ee6befc49339daf164c21f147f47d6c82b/assets/readme/08.png?raw=true)
- Copy const firebaseConfig
![image7](https://github.com/Leandroamaral/Esmeralda/blob/78a9d5ee6befc49339daf164c21f147f47d6c82b/assets/readme/09.png?raw=true)
- Create a firestore database
![image7](https://github.com/Leandroamaral/Esmeralda/blob/78a9d5ee6befc49339daf164c21f147f47d6c82b/assets/readme/10.png?raw=true)
- Select a location and click next
![image8](https://github.com/Leandroamaral/Esmeralda/blob/78a9d5ee6befc49339daf164c21f147f47d6c82b/assets/readme/11.png?raw=true)
- Select Start in production mode
![image9](https://github.com/Leandroamaral/Esmeralda/blob/78a9d5ee6befc49339daf164c21f147f47d6c82b/assets/readme/12.png?raw=true)
- Create Authentication
![image10](https://github.com/Leandroamaral/Esmeralda/blob/78a9d5ee6befc49339daf164c21f147f47d6c82b/assets/readme/13.png?raw=true)
- Select Email/Password as Providers
![image11](https://github.com/Leandroamaral/Esmeralda/blob/78a9d5ee6befc49339daf164c21f147f47d6c82b/assets/readme/14.png?raw=true)
- Save Authentication method
![image12](https://github.com/Leandroamaral/Esmeralda/blob/78a9d5ee6befc49339daf164c21f147f47d6c82b/assets/readme/15.png?raw=true)

4. Configure Firebase Cloud in your App
- On project overview gear -> project settings copy the variable firebaseConf
```
const firebaseConfig = {
  apiKey: "xxxxxx",
  authDomain: "xxxx",
  projectId: "xxxxx",
  storageBucket: "xxxx",
  messagingSenderId: "xxxx",
  appId: "xxxxx"
};
```
- replace this variable on src/firebase/config.js

5. Configure security params on Firestore Database
- On Firestore Database -> Rules change to permit access from App (replace to code bellow)
```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

