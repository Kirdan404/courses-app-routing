import Header from "./components/Header/Header";
import Login from "./components/Login/Login";

function App() {
    return (
        <>
            <Header showUserActions={false} />
            <Login />
        </>
    );
}

export default App;
