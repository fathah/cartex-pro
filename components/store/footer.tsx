export default function StoreFooter() {
  return (
    <footer className="border-t py-12 bg-gray-50 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Cartex Pro. All rights reserved.</p>
        </div>
    </footer>
  );
}
