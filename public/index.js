import React from "react";
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { Helmet } from "react-helmet";
import Routes from "../src/navigator/routes";

export default (req, store, content) => {
    const content = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.path} context={content}>
                <div>{renderRoutes(Routes)}</div>
            </StaticRouter>
        </Provider>
    )
};

const helmet = Helmet.renderStatic();

return `
    <html>
        <head>
        <meta charset="utf-8">
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <!-- Google Tag Manager -->
        <script>
          (function (w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
              "gtm.start": new Date().getTime(),
              event: "gtm.js",
            });
            var f = d.getElementsByTagName(s)[0],
              j = d.createElement(s),
              dl = l != "dataLayer" ? "&l=" + l : "";
            j.async = true;
            j.src =
              "https://www.googletagmanager.com/gtm.js?id=" +
              i +
              dl;
            f.parentNode.insertBefore(j, f);
          })(
            window,
            document,
            "script",
            "dataLayer",
            "GTM-MPLTRRZ"
          );
        </script>
        <!-- End Google Tag Manager -->

        <script src="https://secure.paytabs.com/payment/js/paylib.js"></script>
      
        <meta charset="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.png" />      
        <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
        <meta content="utf-8" http-equiv="encoding">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="noindex, follow" />
      
        <meta name="description"
          content="Global Website of Pigeon Corporation - This page provides information about Pigeon Global." />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
      
        </head>
        <body>
            <!--Google Tag Manager (noscript)-->
            <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MPLTRRZ" height="0" width="0"
                style="display: none; visibility: hidden"></iframe></noscript>
             <!--End Google Tag Manager (noscript)-->

            <noscript>You need to enable JavaScript to run this
                app.</noscript>
            <div id="fb-root">${content}</div>
            <script async defer crossorigin="anonymous"
                src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v11.0&appId=481764742916718&autoLogAppEvents=1"
                nonce="tYYxLN7g"></script>
                
                <script type="text/javascript">
                console.log("tha tha")
                var myform = document.getElementById('payform');
                paylib.inlineForm({
                  'key': '-- Your client key --',
                  'form': myform,
                  'autoSubmit': true,
                  'callback': function(response) {
                    document.getElementById('paymentErrors').innerHTML = '';
                    if (response.error) {             
                      paylib.handleError(document.getElementById('paymentErrors'), response); 
                    }
                  }
                });
                </script>
            <div id="root"></div>
        </body>
    </html>
`

