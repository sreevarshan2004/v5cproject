import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from '../assets/V5 logo with skyblue (1).png';

const V5CLogo = ({ transparentNav = false }) => (
  <motion.div
    className="flex items-center gap-3 group cursor-pointer"
    whileHover={{ scale: 1.05 }}
  >
    <Link to="/" className="flex flex-col items-center gap-0.5" aria-label="V5C Home">
      <img src={logo} alt="V5C Logo" className="w-auto h-14 md:h-17 object-contain" />
      <div className="flex flex-col items-center leading-tight">
        <span className="text-[9px] md:text-[12px] font-semibold tracking-wide text-[#2D1E4F] text-center">V5C Properties LLC.</span>
      </div>
    </Link>
  </motion.div>
);

export default V5CLogo;