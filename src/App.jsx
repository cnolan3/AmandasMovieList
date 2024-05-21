//import { useState } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

function App({ Component, pageProps }) {
    return (
        <>
            <Authenticator>
                {({ signOut, user }) => {
                    <main>
                        <h1>Hello {user?.username}</h1>
                        <button onClick={signOut}>Sign out</button>
                        <Component {...pageProps} />
                    </main>;
                }}
            </Authenticator>
        </>
    );
}

export default App;