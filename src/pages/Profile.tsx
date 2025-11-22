import NavBar from "../components/NavBar";
import { useAuth } from "../context/UseAuth";
import "../styles/Profile.css"

export default function Profile() {
    const { user } = useAuth();

    return (
        <div>
            <NavBar />
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-4xl font-bold">Hola {user?.nombre ?? "invitado"}</h1>
            </div>
        </div>
    );
}