import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-5 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Logo & Description */}
          <div>
            <h2 className="text-2xl font-bold">
              Bangla News <span className="text-red-500">24</span>
            </h2>

            <p className="text-gray-400 mt-3 leading-6">
              দেশের সর্বশেষ সংবাদ, খবর ও আপডেট জানতে আমাদের সাথে থাকুন।
              নির্ভরযোগ্য সংবাদ পৌঁছে দেওয়াই আমাদের লক্ষ্য।
            </p>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              গুরুত্বপূর্ণ লিংক
            </h3>

            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition"
                >
                  হোম
                </Link>
              </li>

              <li>
                <Link
                  href="/category/national"
                  className="hover:text-white transition"
                >
                  জাতীয়
                </Link>
              </li>

              <li>
                <Link
                  href="/category/sports"
                  className="hover:text-white transition"
                >
                  খেলাধুলা
                </Link>
              </li>

              <li>
                <Link
                  href="/category/entertainment"
                  className="hover:text-white transition"
                >
                  বিনোদন
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              যোগাযোগ
            </h3>

            <p className="text-gray-400 mb-2">
              Email: info@banglanews24.com
            </p>

            <p className="text-gray-400">
              Phone: +880 1XXX-XXXXXX
            </p>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-5 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Bangla News 24. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;