package com.jiggag.omf;

import android.app.Application;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import android.util.Base64;
import android.content.Context;
import android.util.Log;

import com.facebook.react.BuildConfig;
import com.facebook.react.PackageList;
import com.google.android.play.core.missingsplits.MissingSplitsManagerFactory;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import java.lang.reflect.InvocationTargetException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MainReactPackage());
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    boolean sideLoading = MissingSplitsManagerFactory.create(this).disableAppIfMissingRequiredSplits();
    if (sideLoading) {
      // Skip app initialization.
      return;
    }
    super.onCreate();
//    getHashKey();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }


  private void getHashKey(){
    PackageInfo packageInfo = null;
    try {
      packageInfo = getPackageManager().getPackageInfo(getPackageName(), PackageManager.GET_SIGNATURES);
    } catch (PackageManager.NameNotFoundException e) {
      e.printStackTrace();
    }
    if (packageInfo == null)
      Log.e("KeyHash", "KeyHash:null");

    for (Signature signature : packageInfo.signatures) {
      try {
        MessageDigest md = MessageDigest.getInstance("SHA");
        md.update(signature.toByteArray());
        Log.d("KeyHash", Base64.encodeToString(md.digest(), Base64.DEFAULT));
      } catch (NoSuchAlgorithmException e) {
        Log.e("KeyHash", "Unable to get MessageDigest. signature=" + signature, e);
      }
    }
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.jiggag.omf");
        aClass
                .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
                .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
