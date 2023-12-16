import Navbar from "@/src/common/components/nav/Navbar";
import Container from "@/src/common/components/Container";
import { AuthPrivateGaurd } from "@/src/common/components/AuthGaurd";

export default function Home() {
  return (
    <main>
      <AuthPrivateGaurd>
        <Navbar />
        <Container className="h-[calc(100vh-60px)] flex justify-center items-center">
          <div>
            Home
          </div>
        </Container>
      </AuthPrivateGaurd>
    </main>
  );
}
