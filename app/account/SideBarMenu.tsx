"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Package, RotateCcw, CreditCard, Heart, User, MapPin, 
  Wallet, ShieldCheck, Gift 
} from 'lucide-react';

const SideBarMenu = () => {

      const pathname = usePathname();

  const menuItems = [
    { icon: Package, label: 'Orders', href: '/account/orders' }, // Default to orders
    { icon: RotateCcw, label: 'Returns', href: '/account/returns' },
    { icon: Heart, label: 'Wishlist', href: '/account/wishlist', badge: '2 items' },
  ];

  const accountItems = [
    { icon: User, label: 'Profile', href: '/account/profile' },
    { icon: MapPin, label: 'Addresses', href: '/account/addresses' },
    { icon: Wallet, label: 'Payments', href: '/account/payments' },
    
  ];
    return (
         <aside className="w-full lg:w-1/4 space-y-6">
            
            {/* User Profile Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-center gap-4">
               <div className="w-12 h-12 bg-[#5d5d5d] rounded-full flex items-center justify-center text-white font-bold text-lg">
                 AF
               </div>
               <div className="overflow-hidden">
                 <h3 className="font-bold text-gray-900 truncate">Hala Abdul!</h3>
                 <p className="text-sm text-gray-500 truncate">abdulfathahkodag@gmail.com</p>
               </div>
            </div>

            {/* Menu Section 1 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link key={item.href} href={item.href}>
                      <div className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${isActive ? 'bg-yellow-50 border-l-4 border-yellow-400' : 'border-l-4 border-transparent'}`}>
                          <div className="flex items-center gap-3">
                              <item.icon size={20} className={isActive ? 'text-black' : 'text-gray-500'} />
                              <span className={`text-sm font-medium ${isActive ? 'text-black' : 'text-gray-700'}`}>{item.label}</span>
                          </div>
                          {item.badge && <span className="text-xs text-gray-400">{item.badge}</span>}
                      </div>
                    </Link>
                  )
                })}
            </div>

            {/* Menu Section 2 - My Account */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                 <div className="px-4 pt-4 pb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                     My Account
                 </div>
                 {accountItems.map((item) => {
                   const isActive = pathname === item.href;
                   return (
                    <Link key={item.href} href={item.href}>
                      <div className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${isActive ? 'bg-yellow-50 border-l-4 border-yellow-400' : 'border-l-4 border-transparent'}`}>
                          <div className="flex items-center gap-3">
                              <item.icon size={20} className={isActive ? 'text-black' : 'text-gray-500'} />
                              <span className={`text-sm font-medium ${isActive ? 'text-black' : 'text-gray-700'}`}>{item.label}</span>
                          </div>
                      </div>
                    </Link>
                   )
                 })}
            </div>

          </aside>
    );
}

export default SideBarMenu;