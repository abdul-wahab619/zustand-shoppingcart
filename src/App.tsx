import { Cart } from "./components/Cart";
import { ChangeQtyButtons } from "./components/ChangeQtyButton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "./components/ui/card";
import { User } from "./components/User";
import { PRODUCTS_DATA } from "./lib/mockData";
import { useStore } from "./store/store";
import { Button } from "./components/ui/button";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { motion } from "framer-motion";
export default function App() {
  const addProduct = useStore((state) => state.addProduct);
  const cartProducts = useStore((state) => state.products);
  const { fullName, userName, fetchUser } = useStore(
    useShallow((state) => ({
      fullName: state.fullName,
      userName: state.userName,
      fetchUser: state.fetchUser,
    }))
  );

  useEffect(() => {
    async function fetchData() {
      await fetchUser();
    }
    fetchData();
  }, [fetchUser]);

  return (
    <main className="p-5 dark min-h-screen bg-slate-900 text-white overflow-auto">
      {/* User and Cart */}
      <div className="flex justify-between items-center mb-6">
        <User />
        <div className="text-center">
          <p>{fullName}</p>
          <p>@{userName}</p>
        </div>
        <Cart />
      </div>

      <motion.h1
        className="text-3xl font-bold mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Products
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {PRODUCTS_DATA.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Card
              key={product.id}
              className="bg-white/10 backdrop-blur-md border border-white/10 rounded-lg p-3 shadow-lg hover:shadow-xl transition"
            >
              <CardHeader className="text-lg font-semibold">
                {product.title}
              </CardHeader>
              <CardContent className="text-zinc-300 text-base mb-2">
                ${product.price}
              </CardContent>
              <CardFooter>
                {cartProducts.find((item) => item.id === product.id) ? (
                  <ChangeQtyButtons productId={product.id} />
                ) : (
                  <Button
                    onClick={() => addProduct(product)}
                    variant="default"
                    className="w-full"
                  >
                    Add to Cart
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}
