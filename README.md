#### package.json
scripts | 설명
---|:---:
`start` | 기존의 빌드된 프로젝트 실행
`ios` | IOS 빌드 & 실행
`android` | Android 빌드 & 실행
`reinstall` | 모듈 재설치
`ios:dev-build` | IOS 개발 빌드
`ios:live-build` | IOS 라이브 빌드
`android:dev-build` | Android 개발 빌드
`android:live-build` | Android 라이브 빌드
`test` | jest 테스트
`lint` | eslint 검사
`lint:fix` | eslint 검사 & 수정
##
#### .eslintrc.js
rules | 설명
---|:---:
`react/jsx-filename-extension` | `js` 파일에서 `jsx` 문법 허용
`quotes` | `"` 대신 `'` 사용
`indent` | 2칸 들여쓰기
`no-var` | `var` 선언 불가
`no-console` | `console.log` eslint off
##
#### ISSUE
```
Application omf has not been registered.

Hint: This error often happens when you're running the packager (local dev server) from a wrong folder. For example you have multiple apps and the packager is still running for the app you were working on before.
If this is the case, simply kill the old packager instance (e.g. close the packager terminal window) and start the packager in the correct app folder (e.g. cd into app folder and run 'npm start').

This error can also happen due to a require() error during initialization or failure to call AppRegistry.registerComponent.
```
타입스크립트를 적용하려고 이것저것 수정했더니 갑자기 시작이 안되고 있다. 아무리 재시작을 해봐도 모듈을 다시 삭제하고 설치해봐도 안된다... 에러메세지를 제일 먼저 읽었어야 했는데, 한참 뒤에 본 마지막 문장 `AppRegistry.registerComponent` 이 눈에 들어왔다.
  
`index.ts` 에서 가장 먼저 앱을 시작하면서 호출되는 부분인데, `app name` 을 텍스트로 변경하면서 `omf` 라고 내 앱 이름을 `omg` 라고 잘못 쓰는 오마이갓 ㅠㅠ
  
앱 이름을 변경하면서 바로 해결되는 `OMG` 이슈였다.
##
```
Invariant Violation: requireNativeComponent: "FastImageView" was not found in the UIManager.
```
`react-native-fast-image` 라이브러리를 설치하고 렌더링 하려고하니 계속 나타나는 오류메세지. 네이티브 기능을 사용하고자 하면 항상 빼먹지 말아야하는 링크 걸기 `react-native link react-native-fast-image` 했더니... 두번째 에러가 발생했다.
```
React Native CLI uses autolinking for native dependencies, but the following modules are linked manually: 
  - react-native-fast-image (to unlink run: "react-native unlink react-native-fast-image")
This is likely happening when upgrading React Native from below 0.60 to 0.60 or above. Going forward, you can unlink this dependency via "react-native unlink <dependency>" and it will be included in your app automatically. If a library isn't compatible with autolinking, disregard this message and notify the library maintainers.
```
RN 버전이 업그레이드 되면서 RN CLI는 네이티브한 것들에 자동 링크를 걸어주니 직접 `link` 할 필요없다고 `unlink` 해달라는 것이다. 이것도 안되고 저것도 안되고 ㅠㅠ
  
`react-native-fast-image` 깃허브 이슈를 찾아서 검색해보니 `ios` 폴더에서 `pod install` 해주면 된다는 댓글을 발견했다. 그리고 진짜로 해결되었다 갓허브!
[react-native-fast-image](https://github.com/DylanVann/react-native-fast-image/issues/257)
##
`react-native-image-picker`로 사진을 찍고 업로드 하고자 라이브러리를 사용하였다. 그런데 아무리 호출해도 반응이 없어 로그를 살펴보니 `permission`을 설정해주지 않았다. 안드로이드와 ios 각각 권한을 추가해줘야 하며 `android-app-src-main` 아래에 위치한 안드로이드 설정파일 `AndroidManifest.xml`에 카메라와 저장소 접근 권한을 설정해주었다. ios는 xcode를 통해 `Info.plist` 설정파일에 `key`를 검색해서 카메라와 사진 접근 권한을 추가해주고 해당 권한을 사용하려는 이유를 설명하면 되는데 IOS의 버전에 따라 설정이 추가되었다고 하니 전부다 설정해주었다.
```
// Android
<uses-permission android:name="android.permission.CAMERA"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>

// IOS
Privacy - Camera Usage Description
Privacy - Photo Library Usage Description
Privacy - Photo Library Additions Usage Description
```
IOS 설정이 적용된 파일을 열어보면 아래와 같은 내용이 추가되어있다.
```
<key>NSCameraUsageDescription</key>
<string>사용자의 카메라에 접근합니다.</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>사용자의 사진첩에 접근합니다.</string>
<key>NSPhotoLibraryAddUsageDescription</key>
<string>사용자의 사진첩에 접근합니다.</string>
```
`key`가 권한설정을 추가한 내용이며 `string`의 문구가 사용자에게 보여진다. 안드로이드는 IOS와 다르게 이런 문구를 직접 적을 수 없다. 덕분에 해외서비스도 지원하는 경우 이 문구를 번역하여 모두 지원하여야만 심사를 통과할 수 있다ㅠㅠ
xcode에서 `InfoPlist.strings` 파일을 생성하고 우측 설정 중 `Localization`에서 기본값 영어를 설정해주었다. `PROJECT-Localizations`에 사용하려는 언어를 추가하고 `InfoPlist.string`에 생성된 언어별 파일에 키와 문구를 입력해주면 된다.
```
"CFBundleDisplayName" = "OMF";
"CFBundleName" = "OMF";
"NSPhotoLibraryUsageDescription" = "We access the user's photo library.";
"NSPhotoLibraryAddUsageDescription" = "We access the user's photo library.";
"NSCameraUsageDescription" = "We access your camera.";
```
##
```
** BUILD FAILED **

The following build commands failed:
        CompileC /ios/build/omf/Build/Intermediates.noindex/Pods.build/Debug-iphonesimulator/React-fishhook.build/Objects-normal/x86_64/fishhook.o /node_modules/react-native/Libraries/fishhook/fishhook.c normal x86_64 c com.apple.compilers.llvm.clang.1_0.compiler
(1 failure)
```
[react-native-community](https://react-native-community.github.io/upgrade-helper/?from=0.60.4&to=0.60.5) React Native v0.60.5에서 삭제된 내용 => ios/Podfile에서 해당 라이브러리 삭제
## 
`react-native-config`를 설정하는게 어려울것 같아 `react-native-dotenv`를 사용하고 있었다. 스크립트에서는 `.env` 변수를 가져올 수 있었으나 네이티브 쪽에서는 접근할 수 없는것 같아서 결국 `react-native-config`로 변경하였다. 구글 로그인과 카카오 로그인을 붙이려고 네이티브 쪽 설정들을 자주 봐서 그런지 전보다 쉽게 설정할 수 있었다. (사실 설정할 것도 없는것 같다...)
## 
```
Execution failed for task ':app:packageRelease'.
> 5 exceptions were raised by workers:
  java.lang.OutOfMemoryError
  java.lang.OutOfMemoryError
  java.lang.OutOfMemoryError
  java.lang.OutOfMemoryError
  java.lang.OutOfMemoryError
```
APK를 CPU 별로 분리하여 빌드 시 메모리 부족 에러 발생 => `gradle.properties` 에 빌드 메모리를 늘려주도록 설정 추가 `org.gradle.jvmargs=-Xmx4g`
##
```
error: package android.support.annotation does not exist
```
구글 로그인 라이브러리를 추가하고 빌드가 안된다. 해당 어노테이션을 찾을 수 없다는데 저건 자동으로 추가되는 라이브러리 아닌가 ㅠㅠ
그리고 또 나타나는 에러 메세지들...
```
Manifest merger failed : Attribute application@appComponentFactory value=(android.support.v4.app.CoreComponentFactory) from [com.android.~~~
```
SDK 28 이후로 `android.~` 이런 패키지들이 변경되었다고 `androidx.~` 로 업데이트 하라는 에러메세지였다.
`안드로이드 스튜디오 => Refactor => Migrate to AndroidX`로 해결
##
```
Invalid character found in method name. HTTP method names must be tokens
```
서버에서 `HTTPS`를 설정한 적이 없는데, `API`를 `HTTPS`로 보내고 있어서 발생한 오류
##
```
Warning: componentWillReceiveProps is deprecated and will be removed in the next major version. Use static getDerivedStateFromProps instead.

Please update the following components: SafeView, Transitioner

Learn more about this warning here:
https://fb.me/react-async-component-lifecycle-hooks
```
`componentWillReceiveProps`이 `deprecated` 됬으니 다음 버전에서는 `getDerivedStateFromProps`로 대체하라는 메세지로 현재 리액트 16.x까지는 지원을 하고 있지만 17에서는 완전 삭제될 예정이라고 한다.
##
`react-native-kakao-logins`를 사용하여 `iOS`는 사용자 정보를 가져오는데 성공하였다. 이제 `안드로이드`를 설정하려고 하는데 생각만큼 간단하지 않았다. iOS가 더 어려울것 같아서 먼저 시작했는데 복병이 여기있었다. `Invalid android_key_hash or ios_bundle_id or web_site_url` 카카오 API를 사용하려고 하는데 안드로이드 키해시를 설정해주지 않아서 로그인에 실패하였다.
```
keytool -exportcert -alias ${디버그키별명} -keystore ${디버그키파일경로} -storepass android -keypass android | openssl sha1 -binary | openssl base64

keytool -exportcert -alias ${릴리즈키별명} -keystore ${릴리즈키파일경로} | openssl sha1 -binary | openssl base64
```
디버그 키해시를 가져와 카카오 API 설정에 추가해주었는데 왜 안되지 -> 릴리즈 키로 빌드를 했고 그럼 키해시도 릴리즈 키해시를 설정해줘야 한다.
그럼 디버그 키와 릴리즈 키가 동일한 경우에는 무엇이 다를까
```
// 디버그
keytool -exportcert -alias keyalias -keystore key.keystore -storepass android -keypass android | openssl sha1 -binary | openssl base64
// 릴리즈
keytool -exportcert -alias keyalias -keystore key.keystore | openssl sha1 -binary | openssl base64
```
두개의 키해시를 비교해보니 아예 다르다... 그리고 디버그 키해시를 생성할 때에는 비밀번호를 입력하지 않았다. 아마 `-storepass android -keypass android` 이 옵션들이 그 차이를 만드는것 같다.
##
`react-native-kakao-logins` 안에 있는 `kakao_strings.xml`에 `KAKAO_API_KEY`를 변경해주어야하는데 그렇다면 라이브러리를 재설치 할때마다 이 키값도 반복해서 적어줘야 한다는건가
##
```
Execution failed for task ':app:lintVitalRelease'.
Could not resolve all artifacts for configuration ':react-native-image-picker:debugUnitTestRuntimeClasspath'.
```
안드로이드 빌드하려는데 자꾸 저런 에러가 나면서 빌드에 실패했다. 에뮬레이터는 되는데 왜 빌드만 안될까?
`react-native-image-picker`가 문제인가 하면서 다운그레이드도 해보고 재설치도 해봤지만 해결되지 않았다.
`Execution failed for task ':app:lintVitalRelease'.` 에러의 원인은 여기있었는데 엉뚱한 곳에서 찾고 있으니 해결이 안되는 것이다.
[Lint 검사로 코드 개선하기](https://developer.android.com/studio/write/lint?hl=ko)
```
// app:build.gradle
lintOptions {
    checkReleaseBuilds false
}
```
해당 옵션을 꺼버렸더니 빌드 성공 그러나 결국 잠재적으로 오류가 생길 수 있다는 것 아닌가
##
```
Cannot read property 'Direction' of undefined
```
`react-navigation`으로 네비게이션 라이브러리를 변경하고 안드로이드 실행하려고 하니 위와 같은 에러가 발생하면서 앱이 실행되지 않는다.
해당 라이브러리 깃허브 이슈에 검색해보니 `react-navigation`은 `react-native-gesture-handler`를 의존하고 있는데 이를 찾을 수 없어 에러가 발생하였다.
의존 라이브러리도 설치하고 `link` 해주니 해결되었다.
[react-navigation 깃허브 이슈](https://github.com/react-navigation/react-navigation/issues/6071#issuecomment-510747297)
##
iOS 시뮬레이터는 `localhost`로 REST API 테스트가 되는데 안드로이드는 되지 않는다.
찾아보니 안드로이드는 IP를 명시해줘야 하는 것 같다.
```
mac: ipconfig getifaddr en0
window: ipconfig
```
