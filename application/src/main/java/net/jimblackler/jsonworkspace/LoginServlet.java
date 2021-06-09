package net.jimblackler.jsonworkspace;

import com.google.api.client.auth.oauth2.AuthorizationCodeFlow;
import com.google.api.client.extensions.servlet.auth.oauth2.AbstractAuthorizationCodeServlet;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/login")
public class LoginServlet extends AbstractAuthorizationCodeServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
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