import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { amenitiesList } from "@/lib/data";
import { Upload, Plus, Minus, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AddHotel() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    city: "",
    state: "",
    description: "",
    amenities: [] as string[],
    images: [] as string[],
    roomTypes: [
      { name: "", price: "", capacity: 2, bedType: "" },
    ],
  });

  const toggleAmenity = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const addRoomType = () => {
    setFormData((prev) => ({
      ...prev,
      roomTypes: [
        ...prev.roomTypes,
        { name: "", price: "", capacity: 2, bedType: "" },
      ],
    }));
  };

  const removeRoomType = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      roomTypes: prev.roomTypes.filter((_, i) => i !== index),
    }));
  };

  const updateRoomType = (index: number, field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      roomTypes: prev.roomTypes.map((room, i) =>
        i === index ? { ...room, [field]: value } : room
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Hotel Submitted!",
        description: "Your hotel listing has been submitted for review.",
      });
      navigate("/partner/hotels");
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Add New Hotel</h2>
        <p className="text-muted-foreground">
          Fill in the details to list your property on BudgetStay
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Hotel Name *</Label>
              <Input
                id="name"
                required
                placeholder="Enter hotel name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  required
                  placeholder="e.g., Jaipur"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  required
                  placeholder="e.g., Rajasthan"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Address / Location *</Label>
              <Input
                id="location"
                required
                placeholder="Full address with landmarks"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                required
                placeholder="Describe your hotel, nearby attractions, unique features..."
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle>Photos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
              <p className="font-medium mb-1">Upload hotel photos</p>
              <p className="text-sm text-muted-foreground mb-4">
                Drag & drop or click to browse. Max 10 images, 5MB each.
              </p>
              <Button type="button" variant="outline">
                Choose Files
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Amenities */}
        <Card>
          <CardHeader>
            <CardTitle>Amenities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {amenitiesList.map((amenity) => (
                <label
                  key={amenity}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Checkbox
                    checked={formData.amenities.includes(amenity)}
                    onCheckedChange={() => toggleAmenity(amenity)}
                  />
                  <span className="text-sm">{amenity}</span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Room Types */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Room Types & Pricing</CardTitle>
            <Button type="button" variant="outline" size="sm" onClick={addRoomType}>
              <Plus className="h-4 w-4 mr-1" />
              Add Room
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.roomTypes.map((room, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg relative"
              >
                {formData.roomTypes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRoomType(index)}
                    className="absolute top-2 right-2 text-destructive hover:bg-destructive/10 rounded p-1"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                )}
                <div className="space-y-2">
                  <Label>Room Name *</Label>
                  <Input
                    required
                    placeholder="e.g., Deluxe Room"
                    value={room.name}
                    onChange={(e) =>
                      updateRoomType(index, "name", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Price per Night (₹) *</Label>
                  <Input
                    required
                    type="number"
                    placeholder="e.g., 1499"
                    value={room.price}
                    onChange={(e) =>
                      updateRoomType(index, "price", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Max Guests *</Label>
                  <Input
                    required
                    type="number"
                    min={1}
                    max={10}
                    value={room.capacity}
                    onChange={(e) =>
                      updateRoomType(index, "capacity", parseInt(e.target.value))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Bed Type *</Label>
                  <Input
                    required
                    placeholder="e.g., King Bed"
                    value={room.bedType}
                    onChange={(e) =>
                      updateRoomType(index, "bedType", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="gap-2">
            <Save className="h-4 w-4" />
            {isLoading ? "Submitting..." : "Submit for Review"}
          </Button>
        </div>
      </form>
    </div>
  );
}
