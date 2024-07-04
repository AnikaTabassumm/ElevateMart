import "../styles/globals.css";
import { Provider } from "react-redux";
import { Poppins } from "next/font/google";
import { store } from "@/store";
import Layout from "@/components/Layout";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <style jsx global>{`
        :root {
          --font-poppins: ${poppins.style.fontFamily};
        }
      `}</style>
      
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
