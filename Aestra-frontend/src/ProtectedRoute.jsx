// import { Navigate } from "react-router-dom";
// import { useAuth } from "./context/AuthContext.jsx";

// export default function ProtectedRoute({ children }) {

//     const {

//         user,

//         loading

//     } = useAuth();

//     if (loading) {

//         return <h2>Loading...</h2>;

//     }

//     if (!user) {

//         return <Navigate to="/" replace />;

//     }

//     return children;

// }

import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";

export default function ProtectedRoute({ children }) {

    const { user, loading } = useAuth();

    console.log("ProtectedRoute:", { user, loading });

    if (loading) {

        return <h2>Loading...</h2>;

    }

    if (!user) {

        console.log("Redirecting to /");

        return <Navigate to="/" replace />;

    }

    console.log("Rendering Home");

    return children;

}