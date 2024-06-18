import Footer from "./components/Footer";
import Header from "./components/Header";
import MessagesList from "./components/MessagesBox/MessagesList";

function App() {
  return (
    <div className="App">
      <Header/>

      <MessagesList/>

      <Footer/>
    </div>
  );
}

export default App;
