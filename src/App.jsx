import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import ComponentsDemo from '@/pages/ComponentsDemo'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/components" element={<ComponentsDemo />} />
      </Routes>
    </BrowserRouter>
  )
}
