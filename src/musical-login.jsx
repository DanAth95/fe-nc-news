export default function Musical() {
  return (
    <>
      <html>
        <head>
          <title>Authenticating Spotify</title>
        </head>
        <body>
          <p>Please wait while we authenticate Spotify...</p>
          <script type="text/javascript">
            if (window.opener){" "}
            {window.opener.postMessage(
              "?" + window.location.href.split("?")[1],
              "*"
            )}{" "}
            else {window.close()}
          </script>
        </body>
      </html>
    </>
  );
}
