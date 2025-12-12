export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section className="flex justify-center bg-slate-100 h-screen">{children}</section>
}