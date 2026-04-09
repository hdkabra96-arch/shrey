import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Pencil, Trash2, LayoutDashboard, ShoppingBag, Menu as MenuIcon, Video, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Product } from '../types';

export default function AdminDashboard() {
  const { products, addProduct, updateProduct, deleteProduct, navItems, updateNavItems } = useStore();
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Wedding',
    type: 'VIDEO',
    image: '',
    videoUrl: '',
    description: '',
  });

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...formData,
      price: Number(formData.price),
      type: formData.type as any,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      toast.success('Product updated successfully');
    } else {
      addProduct(productData);
      toast.success('Product added successfully');
    }
    setIsProductDialogOpen(false);
    setEditingProduct(null);
    setFormData({ name: '', price: '', category: 'Wedding', type: 'VIDEO', image: '', videoUrl: '', description: '' });
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      type: product.type,
      image: product.image,
      videoUrl: product.videoUrl || '',
      description: product.description,
    });
    setIsProductDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif font-bold flex items-center gap-2">
          <LayoutDashboard className="h-8 w-8 text-primary" />
          Admin Dashboard
        </h1>
      </div>

      <Tabs defaultValue="products" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="products" className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" /> Products
          </TabsTrigger>
          <TabsTrigger value="menu" className="flex items-center gap-2">
            <MenuIcon className="h-4 w-4" /> Navigation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Manage Products</CardTitle>
              <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => {
                    setEditingProduct(null);
                    setFormData({ name: '', price: '', category: 'Wedding', type: 'VIDEO', image: '', videoUrl: '', description: '' });
                  }}>
                    <Plus className="h-4 w-4 mr-2" /> Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleProductSubmit} className="space-y-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Product Name</Label>
                      <Input 
                        id="name" 
                        value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                        required 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="price">Price (₹)</Label>
                        <Input 
                          id="price" 
                          type="number" 
                          value={formData.price} 
                          onChange={(e) => setFormData({...formData, price: e.target.value})} 
                          required 
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="type">Type</Label>
                        <Select value={formData.type} onValueChange={(v) => setFormData({...formData, type: v})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="VIDEO">Video</SelectItem>
                            <SelectItem value="GIF">GIF</SelectItem>
                            <SelectItem value="ECARD">E-Card</SelectItem>
                            <SelectItem value="MULTIPLE">Multiple</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="category">Category</Label>
                      <Input 
                        id="category" 
                        value={formData.category} 
                        onChange={(e) => setFormData({...formData, category: e.target.value})} 
                        required 
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="image">Image URL</Label>
                      <Input 
                        id="image" 
                        value={formData.image} 
                        onChange={(e) => setFormData({...formData, image: e.target.value})} 
                        placeholder="https://..." 
                        required 
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="video">Video URL (Optional)</Label>
                      <Input 
                        id="video" 
                        value={formData.videoUrl} 
                        onChange={(e) => setFormData({...formData, videoUrl: e.target.value})} 
                        placeholder="YouTube/Vimeo link" 
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="desc">Description</Label>
                      <Input 
                        id="desc" 
                        value={formData.description} 
                        onChange={(e) => setFormData({...formData, description: e.target.value})} 
                        required 
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      {editingProduct ? 'Update Product' : 'Save Product'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <img src={product.image} alt="" className="h-10 w-10 rounded object-cover" />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-[10px] bg-secondary text-secondary-foreground font-bold">
                          {product.type}
                        </span>
                      </TableCell>
                      <TableCell>₹{product.price}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => openEditDialog(product)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive" onClick={() => {
                            deleteProduct(product.id);
                            toast.error('Product deleted');
                          }}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="menu">
          <Card>
            <CardHeader>
              <CardTitle>Navigation Menu Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                The navigation menu is currently driven by the store context. 
                In a full implementation, you would be able to drag and drop to reorder or add new mega menu categories here.
              </p>
              <div className="space-y-4">
                {navItems.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <MenuIcon className="h-5 w-5 text-muted-foreground" />
                      <span className="font-bold">{item.name}</span>
                      {item.mega && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Mega Menu</span>}
                    </div>
                    <Button variant="outline" size="sm">Edit Structure</Button>
                  </div>
                ))}
                <Button variant="outline" className="w-full border-2 border-dashed">
                  <Plus className="h-4 w-4 mr-2" /> Add Main Menu Item
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
