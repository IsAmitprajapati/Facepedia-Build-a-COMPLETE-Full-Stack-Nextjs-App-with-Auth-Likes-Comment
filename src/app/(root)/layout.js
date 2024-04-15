import Header from "@/components/Header";
import { Provider } from "@/providers/provider";

export default function RootLayout({ children }) {
    return (
      <main>
        <Provider>
            <Header/>
            { children}
        </Provider>
      </main>
    );
  }
  