import { UserIcon } from "lucide-react";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useStore } from "../store/store";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { motion } from "framer-motion";
export function User() {
  const { setAddress, address, fullName, userName, fetchUser } = useStore(
    useShallow((state) => ({
      fullName: state.fullName,
      userName: state.userName,
      address: state.address,
      setAddress: state.setAddress,
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
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="icon" className="hover:bg-slate-600">
          <UserIcon className="w-5 h-5" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 space-y-4 p-4 bg-slate-800 border border-slate-700 rounded-lg shadow-xl text-white">
        {/* Animating the content with motion */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="flex flex-col space-y-1">
            <p className="text-lg font-semibold">{fullName}</p>
            <p className="text-sm text-slate-400">@{userName}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-slate-300">
              Your Address
            </Label>

            {/* Adding animation to the address input field */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                className="bg-slate-700 text-white placeholder:text-slate-400 border border-slate-600 focus:border-white"
              />
            </motion.div>
          </div>
        </motion.div>
      </PopoverContent>
    </Popover>
  );
}
