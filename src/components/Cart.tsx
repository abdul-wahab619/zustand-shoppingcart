import { CircleX, ShoppingCart, Trash2 } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

import { ChangeQtyButtons } from "./ChangeQtyButton";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useStore } from "../store/store";
import { motion } from "framer-motion";

export function Cart() {
  const { reset, products, removeProduct, total, address } = useStore(
    useShallow((state) => ({
      reset: state.reset,
      products: state.products,
      removeProduct: state.removeProduct,
      total: state.total,
      address: state.address,
    }))
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="icon" className="hover:bg-slate-600">
          <ShoppingCart />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-96 max-h-[80vh] overflow-y-auto space-y-4 p-4 bg-slate-800 border border-slate-700 rounded-lg shadow-xl text-white">
        {/* Popover Header with Slide-in Effect */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex items-center justify-between"
        >
          <h1 className="text-xl font-semibold">Your Cart</h1>
          <Button onClick={reset} variant="destructive" size="icon">
            <CircleX />
          </Button>
        </motion.div>

        {/* Product List */}
        <div className="space-y-3">
          {products.length === 0 ? (
            <motion.p
              className="text-slate-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              Your cart is empty.
            </motion.p>
          ) : (
            products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Card
                  key={product.id}
                  className="bg-white/10 border border-white/10 rounded-md p-3"
                >
                  <CardHeader className="flex items-center justify-between p-0 mb-2">
                    <CardTitle className="text-base">{product.title}</CardTitle>
                    <Button
                      onClick={() => removeProduct(product.id)}
                      size="icon"
                      variant="ghost"
                      className="text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="text-slate-300 text-sm p-0 mb-2">
                    ${product.price.toFixed(2)}
                  </CardContent>
                  <CardFooter className="p-0">
                    <ChangeQtyButtons productId={product.id} />
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        {/* Cart Total and Address */}
        {products.length > 0 && (
          <motion.div
            className="border-t border-slate-700 pt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <p className="text-base font-semibold">
              Total: ${total.toFixed(2)}
            </p>
            <p className="text-sm text-slate-400">
              Shipping to: {address || "No address provided"}
            </p>
          </motion.div>
        )}
      </PopoverContent>
    </Popover>
  );
}
