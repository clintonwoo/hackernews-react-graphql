import { SoundProvider } from "../src/context/state";

function MyApp({ Component, pageProps }) {
    return (
        <SoundProvider>
            <Component {...pageProps} />
        </SoundProvider>
    );
}

export default MyApp;