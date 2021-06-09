package net.jimblackler.jsonworkspace;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.LinkedHashMap;
import java.util.Map;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/getToken")
public class GetToken extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
    Map<String, Object> data = new LinkedHashMap<>();
    String userId = req.getSession().getId();
    GoogleAuthorizationCodeFlow flow = FlowUtils.newFlow();
    Credential credential = flow.loadCredential(userId);
    if (credential != null) {
      data.put("accessToken", credential.getAccessToken());
    }
    resp.setContentType("text/json");
    try (PrintWriter writer = resp.getWriter()) {
      new ObjectMapper().writerWithDefaultPrettyPrinter().writeValue(writer, data);
    }
  }
}
