import Link from "next/link";
import { Separator } from "./ui/separator";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Clock,
  CreditCard,
  Truck,
  Shield,
  Leaf,
  Heart,
  Award,
} from "lucide-react";

const footerSections = {
  company: [
    { name: "Sobre Nosotros", link: "/about" },
    { name: "Nuestra Historia", link: "/historia" },
    { name: "Misión y Visión", link: "/mision" },
    { name: "Certificaciones", link: "/certificaciones" },
    { name: "Trabaja con Nosotros", link: "/careers" },
  ],
  products: [
    { name: "Jabones Naturales", link: "/productos/jabones" },
    { name: "Jabones Medicinales", link: "/productos/medicinales" },
    { name: "Aceites Esenciales", link: "/productos/aceites" },
    { name: "Kits de Regalo", link: "/productos/kits" },
    { name: "Productos Nuevos", link: "/productos/nuevos" },
  ],
  customer: [
    { name: "Mi Cuenta", link: "/account" },
    { name: "Mis Pedidos", link: "/orders" },
    { name: "Lista de Deseos", link: "/wishlist" },
    { name: "Programa de Puntos", link: "/rewards" },
    { name: "Reseñas", link: "/reviews" },
  ],
  support: [
    { name: "Centro de Ayuda", link: "/help" },
    { name: "Envíos y Devoluciones", link: "/shipping" },
    { name: "Guía de Tallas", link: "/size-guide" },
    { name: "Preguntas Frecuentes", link: "/faq" },
    { name: "Contacto", link: "/contact" },
  ],
  legal: [
    { name: "Política de Privacidad", link: "/privacy" },
    { name: "Términos y Condiciones", link: "/terms" },
    { name: "Política de Cookies", link: "/cookies" },
    { name: "Política de Devoluciones", link: "/returns" },
  ],
};

const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    link: "https://facebook.com/regalosdelcorazonrdc",
  },
  {
    name: "Instagram",
    icon: Instagram,
    link: "https://instagram.com/regalosdelcorazonrdc",
  },
  {
    name: "Twitter",
    icon: Twitter,
    link: "https://twitter.com/regalosdelcorazonrdc",
  },
];

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 mt-16">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <Leaf className="w-8 h-8 text-green-600 mr-2" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                Regalos del corazón
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">
              Creamos jabones artesanales 100% naturales con ingredientes
              orgánicos seleccionados. Cuidamos tu piel y el medio ambiente con
              productos libres de químicos dañinos.
            </p>
          </div>

          {/* Products Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Productos
            </h4>
            <ul className="space-y-2">
              {footerSections.products.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.link}
                    className="text-sm text-gray-600 dark:text-gray-300 hover:text-green-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                CONTÁCTANOS
              </h4>
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <MapPin className="w-5 h-5 mr-3 text-green-600" />
                  <span>General Manuel Belgrano, (Formosa)</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Phone className="w-4 h-4 mr-3 text-green-600" />
                  <span>+54 3704678598</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Mail className="w-4 h-4 mr-3 text-green-600" />
                  <span>rdc@gmail.com</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Clock className="w-4 h-4 mr-3 text-green-600" />
                  <span>Lun - Vie: 9:00 - 18:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.link}
                className="text-gray-400 hover:text-green-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <social.icon className="w-8 h-8" />
                <span className="sr-only">{social.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center">
              <Truck className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <h5 className="font-semibold text-gray-900 dark:text-white text-sm">
                  Envío Gratis
                </h5>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  En compras +$75.000
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <h5 className="font-semibold text-gray-900 dark:text-white text-sm">
                  Compra Segura
                </h5>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Protección garantizada
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <Heart className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <h5 className="font-semibold text-gray-900 dark:text-white text-sm">
                  100% Natural
                </h5>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Ingredientes orgánicos
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <Award className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <h5 className="font-semibold text-gray-900 dark:text-white text-sm">
                  Calidad Premium
                </h5>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Productos artesanales
                </p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 border-gray-200 dark:border-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-300 mb-4 md:mb-0">
            <p>
              &copy; 2025{" "}
              <Link
                href="/"
                className="font-semibold hover:text-green-600 transition-colors"
              >
                Regalos del Corazón
              </Link>
              . Todos los derechos reservados.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-xs">
            {footerSections.legal.map((item, index) => (
              <span key={item.name}>
                <Link
                  href={item.link}
                  className="text-gray-600 dark:text-gray-300 hover:text-green-600 transition-colors"
                >
                  {item.name}
                </Link>
                {index < footerSections.legal.length - 1 && (
                  <span className="ml-4 text-gray-400">|</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
