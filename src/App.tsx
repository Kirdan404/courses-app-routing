import Header from "./components/Header/Header";
import Registration from "./components/Registration/Registration";

function App() {
    return (
        <>
            <Header showUserActions={false} />
            <Registration />
        </>
    );
}

export default App;
