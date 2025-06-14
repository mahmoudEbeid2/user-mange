import "bootstrap/dist/css/bootstrap.min.css";
import SessionWrapper from "./components/SessionWrapper";

export const metadata = {
  title: "User Management",
  description: "App with Google Auth and CRUD",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
