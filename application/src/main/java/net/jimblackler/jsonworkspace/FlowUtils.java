package net.jimblackler.jsonworkspace;

import com.google.api.client.extensions.appengine.datastore.AppEngineDataStoreFactory;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.http.GenericUrl;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import javax.servlet.http.HttpServletRequest;

public class FlowUtils {
  static String getRedirectUri(HttpServletRequest req) {
    GenericUrl url = new GenericUrl(req.getRequestURL().toString());
    url.setRawPath("/oauth2callback");
    return url.build();
  }

  static GoogleAuthorizationCodeFlow newFlow() throws IOException {
    return new GoogleAuthorizationCodeFlow
        .Builder(new NetHttpTransport(), new GsonFactory(),
            GoogleClientSecrets.load(new GsonFactory(),
                new InputStreamReader(FlowUtils.class.getResourceAsStream("/client_secret.json"),
                    StandardCharsets.UTF_8)),
            Collections.singletonList("https://www.googleapis.com/auth/drive.file"))
        .setDataStoreFactory(AppEngineDataStoreFactory.getDefaultInstance())
        .setAccessType("offline")
        .build();
  }
}