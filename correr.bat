echo Instalar las cuestiones
dir
echo 
echo instala cordova-plugin-actionsheet
echo
ionic cordova plugin add cordova-plugin-actionsheet
npm install --save @ionic-native/action-sheet
ionic cordova plugin add cordova-plugin-background-mode
npm install --save @ionic-native/background-mode
ionic cordova plugin add cordova-plugin-device
npm install --save @ionic-native/device
ionic cordova plugin add cordova-plugin-dialogs
npm install --save @ionic-native/dialogs
ionic cordova plugin add cordova-plugin-geolocation
npm install --save @ionic-native/geolocation
ionic cordova plugin add cordova-plugin-googlemaps@1.4.5 --variable API_KEY_FOR_ANDROID="AIzaSyDh7gifeXMtWPzP6CeA8ob9kcqm6yV1Gbo" --variable API_KEY_FOR_IOS="AIzaSyDh7gifeXMtWPzP6CeA8ob9kcqm6yV1Gbo"
npm install --save @ionic-native/google-maps
ionic cordova plugin add ionic-plugin-keyboard
npm install --save @ionic-native/keyboard
ionic cordova plugin add cordova-plugin-ionic-webview --save
ionic cordova plugin add cordova-plugin-nativeaudio
npm install --save @ionic-native/native-audio
ionic cordova plugin add cordova-plugin-nativegeocoder
npm install --save @ionic-native/native-geocoder
ionic cordova plugin add cordova-plugin-network-information
npm install --save @ionic-native/network
ionic cordova plugin add cordova-plugin-splashscreen
npm install --save @ionic-native/splash-screen
ionic cordova plugin add ionic-plugin-keyboard
npm install --save @ionic-native/keyboard
ionic cordova plugin add onesignal-cordova-plugin
npm install --save @ionic-native/onesignal
ionic cordova plugin add uk.co.workingedge.phonegap.plugin.launchnavigator
npm install --save @ionic-native/launch-navigator

echo revisar cada una si instalo OJO
pause
