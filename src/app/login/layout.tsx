

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className='login-page'>
            {children}
        </div>
    )
}
