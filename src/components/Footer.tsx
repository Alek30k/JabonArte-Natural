import Link from "next/link";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
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
    link: "https://facebook.com/jabonartnatural",
  },
  {
    name: "Instagram",
    icon: Instagram,
    link: "https://instagram.com/jabonartnatural",
  },
  {
    name: "Twitter",
    icon: Twitter,
    link: "https://twitter.com/jabonartnatural",
  },
];

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 mt-16">
      {/* Newsletter Section */}
      <div className="bg-green-600 dark:bg-green-700">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">
              Suscríbete a nuestro newsletter
            </h3>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Recibe ofertas exclusivas, tips de cuidado natural y novedades
              sobre nuestros productos artesanales
            </p>
            <div className="max-w-md mx-auto flex gap-2">
              <Input
                type="email"
                placeholder="Tu email"
                className="bg-white text-gray-900"
              />
              <Button
                variant="secondary"
                className="bg-white text-green-600 hover:bg-gray-100"
              >
                <Mail className="w-4 h-4 mr-2" />
                Suscribirse
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
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

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <MapPin className="w-4 h-4 mr-3 text-green-600" />
                <span>Av. Natural 123, Ciudad Orgánica, Argentina</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Phone className="w-4 h-4 mr-3 text-green-600" />
                <span>+54 11 1234-5678</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Mail className="w-4 h-4 mr-3 text-green-600" />
                <span>hola@jabonartnatural.com</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Clock className="w-4 h-4 mr-3 text-green-600" />
                <span>Lun - Vie: 9:00 - 18:00</span>
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
                  <social.icon className="w-5 h-5" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Empresa
            </h4>
            <ul className="space-y-2">
              {footerSections.company.map((item) => (
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

          {/* Customer Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Mi Cuenta
            </h4>
            <ul className="space-y-2">
              {footerSections.customer.map((item) => (
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

          {/* Support Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Soporte
            </h4>
            <ul className="space-y-2">
              {footerSections.support.map((item) => (
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
                  En compras +$15.000
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

        {/* Payment Methods */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Métodos de Pago Aceptados
              </h5>
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-white rounded px-2 py-1 shadow-sm">
                  <CreditCard className="w-4 h-4 text-blue-600 mr-1" />
                  <span className="text-xs font-medium">Visa</span>
                </div>
                <div className="flex items-center bg-white rounded px-2 py-1 shadow-sm">
                  <CreditCard className="w-4 h-4 text-red-600 mr-1" />
                  <span className="text-xs font-medium">Mastercard</span>
                </div>
                <div className="flex items-center bg-white rounded px-2 py-1 shadow-sm">
                  <span className="text-xs font-medium text-blue-600">
                    MercadoPago
                  </span>
                </div>
                <div className="flex items-center bg-white rounded px-2 py-1 shadow-sm">
                  <span className="text-xs font-medium text-green-600">
                    Transferencia
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Certificaciones
              </h5>
              <div className="flex items-center space-x-2">
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                  Cruelty Free
                </div>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                  Orgánico
                </div>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                  Eco-Friendly
                </div>
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
