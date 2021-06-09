package net.jimblackler.jsonworkspace;

import com.google.api.client.auth.oauth2.AuthorizationCodeFlow;
import com.google.api.client.auth.oauth2.AuthorizationCodeResponseUrl;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.servlet.auth.oauth2.AbstractAuthorizationCodeCallbackServlet;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet(urlPatterns = "/oauth2callback/*")
public class Oauth2CallbackServlet extends AbstractAuthorizationCodeCallbackServlet {
  @Override
  protected void onSuccess(HttpServletRequest req, HttpServletResponse resp, Credential credential)
      throws IOException {
    resp.sendRedirect("/");
  }

  @Override
  protected void onError(HttpServletRequest req, HttpServletResponse resp,
      AuthorizationCodeResponseUrl errorResponse) throws IOException {
    resp.sendRedirect("/");
  }

  @Override
  protected String getRedirectUri(HttpServletRequest req) {
    return FlowUtils.getRedirectUri(req);
  }

  @Override
  protected AuthorizationCodeFlow initializeFlow() throws IOException {
    return FlowUtils.newFlow();
  }

  @Override
  protected String getUserId(HttpServletRequest req) {
    HttpSession session = req.getSession();
    return session.getId();
  }
}
