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
          <h1 className="text-xl font-bold">
          This is protected page for LSP, since LSP don&apos;t have any landing page
          </h1>
          <p className="text-center text-muted-foreground">LSP can land here iff lsp is onboarded & may be verified also</p>
          </div>
        </Container>
      </AuthPrivateGaurd>
    </main>
  );
}
