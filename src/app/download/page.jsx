export default function Download() {
    return (
        <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center", background: "linear-gradient(135deg, #2c3e50, #4ca1af)", padding: "0", margin: "0", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
            <div style={{ background: "#fff", padding: "30px", borderRadius: "10px", boxShadow: "0px 4px 15px rgba(0,0,0,0.2)", maxWidth: "400px", width: "100%", textAlign: "center", position: "relative", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <div style={{ position: "absolute", top: "-50px", left: "-50px", width: "100px", height: "100px", background: "rgba(0, 123, 255, 0.2)", borderRadius: "50%" }}></div>
                <div style={{ position: "absolute", bottom: "-50px", right: "-50px", width: "100px", height: "100px", background: "rgba(0, 123, 255, 0.2)", borderRadius: "50%" }}></div>
                <h2 style={{ color: "#333", marginBottom: "10px" }}>DMS Mining</h2>
                <a href="" download style={{ display: "inline-block", background: "#007BFF", color: "#fff", padding: "12px 25px", textDecoration: "none", fontSize: "16px", borderRadius: "5px", transition: "0.3s", boxShadow: "0px 3px 10px rgba(0, 123, 255, 0.3)" }}>Download</a>
            </div>
        </div>
    );
}
