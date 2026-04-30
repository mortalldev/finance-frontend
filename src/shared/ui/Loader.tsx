import { motion } from 'framer-motion'

export function Loader() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="relative h-16 w-16">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="h-full w-full rounded-full border-4 border-blue-100 border-t-blue-600 dark:border-slate-800 dark:border-t-blue-400"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-2 rounded-full border-4 border-indigo-100 border-t-indigo-500 opacity-50 dark:border-slate-800 dark:border-t-indigo-400"
        />
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="text-sm font-bold tracking-widest text-slate-400 uppercase"
      >
        Yuklanmoqda...
      </motion.p>
    </div>
  )
}
