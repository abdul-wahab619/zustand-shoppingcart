import { Minus, Plus } from "lucide-react";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { motion } from "framer-motion"; 

import { Button } from "./ui/button";
import { useStore } from "../store/store";

type Props = { productId: string };

export function ChangeQtyButtons({ productId }: Props) {
  const { getProductById, decQty, incQty, setTotal } = useStore(
    useShallow((state) => ({
      getProductById: state.getProductById,
      decQty: state.decQty,
      incQty: state.incQty,
      setTotal: state.setTotal,
    }))
  );

  const product = getProductById(productId);

  useEffect(() => {
    const unSub = useStore.subscribe(
      (state) => state.products,
      (products: any[]) => {
        setTotal(
          products.reduce((acc, item) => acc + item.price * item.qty, 0)
        );
      },
      { fireImmediately: true }
    );
    return unSub;
  }, [setTotal]);

  if (!product) return null;

  return (
    <div className="flex items-center gap-2 bg-slate-700 px-3 py-1 rounded-full shadow-inner border border-slate-600">
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        key={product.qty} // To trigger animation on qty change
        className="flex items-center gap-2"
      >
        <Button
          onClick={() => decQty(product.id)}
          size="icon"
          variant="ghost"
          className="text-white hover:bg-slate-600"
        >
          <Minus className="w-4 h-4" />
        </Button>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-sm font-medium"
        >
          {product.qty}
        </motion.span>

        <Button
          onClick={() => incQty(product.id)}
          size="icon"
          variant="ghost"
          className="text-white hover:bg-slate-600"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </motion.div>
    </div>
  );
}
