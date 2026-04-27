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

const PRODUCT_CATEGORIES = [
  "Engagement",
  "Traditional Indian",
  "Floral",
  "Photo Based",
  "Modern",
  "Destination",
  "Caricature",
  "Save The Date",
  "PDF Invitation",
  "Video Invitation",
  "GIF Invitation",
  "Ecard Invitation",
  "Hindu Wedding",
  "Christian Wedding",
  "Muslim Wedding",
  "Sikh Wedding"
];

export default function AdminDashboard() {
  const { products, addProduct, updateProduct, deleteProduct, navItems, updateNavItems, bannerSlides, updateBannerSlides, brandMessage, updateBrandMessage } = useStore();
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: PRODUCT_CATEGORIES[0],
    type: 'VIDEO',
    image: '',
    images: [] as string[],
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
    setFormData({ name: '', price: '', category: PRODUCT_CATEGORIES[0], type: 'VIDEO', image: '', images: [], videoUrl: '', description: '' });
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      type: product.type,
      image: product.image,
      images: product.images || [],
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
                <TabsList className="grid w-full grid-cols-4 lg:w-[800px]">
          <TabsTrigger value="products" className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" /> Products
          </TabsTrigger>
          <TabsTrigger value="menu" className="flex items-center gap-2">
            <MenuIcon className="h-4 w-4" /> Navigation
          </TabsTrigger>
          <TabsTrigger value="hero" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" /> Banner Images
          </TabsTrigger>
          <TabsTrigger value="brand" className="flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4" /> Brand Profile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Manage Products</CardTitle>
              <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
                <DialogTrigger 
                  render={<Button />}
                  onClick={() => {
                    setEditingProduct(null);
                    setFormData({ name: '', price: '', category: PRODUCT_CATEGORIES[0], type: 'VIDEO', image: '', images: [], videoUrl: '', description: '' });
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Product
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
                      <Select value={formData.category} onValueChange={(v) => setFormData({...formData, category: v})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {PRODUCT_CATEGORIES.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="image">Primary Image URL (or upload)</Label>
                      <div className="flex gap-2">
                        <Input 
                          id="image" 
                          value={formData.image} 
                          onChange={(e) => setFormData({...formData, image: e.target.value})} 
                          placeholder="https://..." 
                          required 
                          className="flex-1"
                        />
                        <Input 
                          type="file" 
                          accept="image/*"
                          className="w-[150px]"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setFormData({...formData, image: reader.result as string});
                              };
                              reader.readAsDataURL(file);
                            }
                          }} 
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="images">Additional Images (Upload Multiple)</Label>
                      <Input 
                        id="images" 
                        type="file" 
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          const promises = files.map(file => {
                            return new Promise<string>((resolve) => {
                              const reader = new FileReader();
                              reader.onloadend = () => resolve(reader.result as string);
                              reader.readAsDataURL(file);
                            });
                          });
                          Promise.all(promises).then(base64Images => {
                            setFormData(prev => ({
                              ...prev,
                              images: [...prev.images, ...base64Images]
                            }));
                          });
                        }} 
                      />
                      {formData.images.length > 0 && (
                        <div className="flex gap-2 flex-wrap mt-2">
                          {formData.images.map((img, i) => (
                            <div key={i} className="relative group">
                              <img src={img} alt="" className="w-16 h-16 object-cover rounded shadow-sm" />
                              <button 
                                type="button"
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => {
                                  const newImages = [...formData.images];
                                  newImages.splice(i, 1);
                                  setFormData({...formData, images: newImages});
                                }}
                              >
                                &times;
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
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
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Navigation Menu Settings</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  if (confirm('Are you sure you want to reset the menu to defaults? This will overwrite your current menu structure.')) {
                    localStorage.removeItem('navItems');
                    window.location.reload();
                  }
                }}
              >
                Reset to Defaults
              </Button>
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
        <TabsContent value="hero">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Manage Banner Images</CardTitle>
              <Button onClick={() => {
                const newSlides = [...bannerSlides, { title: 'New Ecard', url: 'https://picsum.photos/seed/new/450/800' }];
                updateBannerSlides(newSlides);
                toast.success('New banner slide added');
              }}>
                <Plus className="h-4 w-4 mr-2" /> Add Slide
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bannerSlides.map((slide, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 border rounded-lg bg-muted/30">
                    <img src={slide.url} alt={slide.title} className="h-20 w-12 object-cover rounded shadow-sm" />
                    <div className="flex-1 space-y-2">
                      <div className="grid gap-2">
                        <Label>Title</Label>
                        <Input 
                          value={slide.title} 
                          onChange={(e) => {
                            const newSlides = [...bannerSlides];
                            newSlides[idx].title = e.target.value;
                            updateBannerSlides(newSlides);
                          }} 
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Image (Upload or enter URL)</Label>
                        <div className="flex gap-2">
                          <Input 
                            value={slide.url} 
                            placeholder="Image URL"
                            onChange={(e) => {
                              const newSlides = [...bannerSlides];
                              newSlides[idx].url = e.target.value;
                              updateBannerSlides(newSlides);
                            }} 
                            className="flex-1"
                          />
                          <Input 
                            type="file" 
                            accept="image/*"
                            className="w-[200px]"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  const newSlides = [...bannerSlides];
                                  newSlides[idx].url = reader.result as string;
                                  updateBannerSlides(newSlides);
                                };
                                reader.readAsDataURL(file);
                              }
                            }} 
                          />
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-destructive mt-6 self-start" 
                      onClick={() => {
                        const newSlides = bannerSlides.filter((_, i) => i !== idx);
                        updateBannerSlides(newSlides);
                        toast.success('Slide removed');
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="brand">
          <Card>
            <CardHeader>
              <CardTitle>Manage Brand Message</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label>Heading</Label>
                  <textarea 
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    value={brandMessage.heading} 
                    onChange={(e) => updateBrandMessage({ ...brandMessage, heading: e.target.value })} 
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Sub Heading (Description)</Label>
                  <textarea 
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    value={brandMessage.subHeading} 
                    onChange={(e) => updateBrandMessage({ ...brandMessage, subHeading: e.target.value })} 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
