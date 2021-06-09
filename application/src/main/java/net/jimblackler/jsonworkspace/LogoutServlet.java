package net.jimblackler.jsonworkspace;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/logout")
public class LogoutServlet extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
    req.getSession().invalidate();
    String redirect = req.getParameter("redirect");
    if (redirect == null) {
      redirect = "/";
    }
    resp.sendRedirect(redirect);
  }
}
