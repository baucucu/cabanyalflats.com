import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const apartments = [
  { name: "PLN Bajo", type: "full", rent: 1800 },
  {
    name: "Dr Lluch",
    type: "room",
    rooms: [
      { name: "Room 1", rent: 450, status: "occupied" },
      { name: "Room 2", rent: 475, status: "occupied" },
      { name: "Room 3", rent: 450, status: "occupied" },
      { name: "Room 4", rent: 650, status: "occupied" },
      { name: "Room 5", rent: 450, status: "available" },
      { name: "Room 6", rent: 450, status: "available" },
      { name: "Room 7", rent: 450, status: "occupied" },
    ],
  },
  {
    name: "Calle Salvador 10",
    type: "room",
    rooms: [
      { name: "Room 1", rent: 450, status: "occupied" },
      { name: "Room 2", rent: 450, status: "occupied" },
    ],
  },
  { name: "PLN Arriba", type: "full", rent: 1800, status: "available" },
  {
    name: "Manuela Estelles",
    type: "room",
    rooms: [
      { name: "Room 1", rent: 525, status: "available" },
      { name: "Room 2", rent: 525, status: "occupied" },
      { name: "Room 3", rent: 525, status: "occupied" },
    ],
  },
  {
    name: "San Pedro rooms",
    type: "room",
    rooms: [
      { name: "Room 1", rent: 450, status: "occupied" },
      { name: "Room 2", rent: 450, status: "occupied" },
      { name: "Room 3", rent: 450, status: "occupied" },
      { name: "Room 4", rent: 450, status: "available" },
      { name: "Room 5", rent: 450, status: "available" },
      { name: "Room 6", rent: 450, status: "occupied" },
      { name: "Room 7", rent: 450, status: "occupied" },
      { name: "Room 8", rent: 450, status: "occupied" },
      { name: "Room 9", rent: 450, status: "occupied" },
      { name: "Room 10", rent: 450, status: "occupied" },
    ],
  },
  {
    name: "San Pedro lockers",
    type: "trastero",
    units: [
      { name: "Unit 1", rent: 150, status: "occupied" },
      { name: "Unit 2", rent: 150, status: "occupied" },
      { name: "Unit 3", rent: 150, status: "occupied" },
      { name: "Unit 4", rent: 150, status: "available" },
      { name: "Unit 5", rent: 150, status: "occupied" },
      { name: "Unit 6", rent: 150, status: "available" },
      { name: "Unit 7", rent: 150, status: "occupied" },
      { name: "Unit 8", rent: 150, status: "occupied" },
    ],
  },
  {
    name: "Padre Navarro 62",
    type: "trastero",
    units: [{ name: "Unit 1", rent: 150, status: "occupied" }],
  },
];

export default function PropertiesSection() {
  return (
    <section id="apartments" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          Our Properties
        </h2>

        <h3 className="text-2xl font-semibold mb-6">Full Apartments</h3>
        <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2 lg:grid-cols-3">
          {apartments
            .filter((apt) => apt.type === "full")
            .map((apartment, index) => (
              <Card key={index} className="overflow-hidden">
                <Image
                  src={`https://placehold.co/300x200?text=${encodeURIComponent(
                    apartment.name
                  )}`}
                  alt={apartment.name}
                  width={300}
                  height={200}
                  className="w-full object-cover h-48"
                />
                <CardHeader>
                  <CardTitle>{apartment.name}</CardTitle>
                  <CardDescription>Full apartment rental</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">
                    €{apartment.rent.toFixed(2)}/month
                  </p>
                  {apartment.status === "available" ? (
                    <Badge className="bg-green-700">Available</Badge>
                  ) : (
                    <Badge className="bg-red-500">Occupied</Badge>
                  )}
                </CardContent>
                <CardFooter>
                  <Button>View Details</Button>
                </CardFooter>
              </Card>
            ))}
        </div>

        <h3 className="text-2xl font-semibold mb-6">Rooms for Rent</h3>
        <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2">
          {apartments
            .filter((apt) => apt.type === "room")
            .map((apartment, index) => (
              <Card key={index} className="w-full overflow-hidden">
                <Image
                  src={`https://placehold.co/300x200?text=${encodeURIComponent(
                    apartment.name
                  )}`}
                  alt={apartment.name}
                  width={300}
                  height={200}
                  className="w-full object-cover h-48"
                />
                <CardHeader>
                  <CardTitle>{apartment.name}</CardTitle>
                  <CardDescription>Individual room rentals</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Room</TableHead>
                        <TableHead>Rent</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {apartment.rooms.map((room, roomIndex) => (
                        <TableRow key={roomIndex}>
                          <TableCell>{room.name}</TableCell>
                          <TableCell>€{room.rent.toFixed(2)}</TableCell>
                          <TableCell>
                            {room.status === "occupied" ? (
                              <Badge className="bg-red-500">Occupied</Badge>
                            ) : (
                              <Badge className="bg-green-700">Available</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <Button>View Details</Button>
                </CardFooter>
              </Card>
            ))}
        </div>

        <h3 className="text-2xl font-semibold mb-6">
          Storage Units (Trasteros)
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {apartments
            .filter((apt) => apt.type === "trastero")
            .map((apartment, index) => (
              <Card key={index} className="w-full overflow-hidden">
                <Image
                  src={`https://placehold.co/300x200?text=${encodeURIComponent(
                    apartment.name
                  )}`}
                  alt={apartment.name}
                  width={300}
                  height={200}
                  className="w-full object-cover h-48"
                />
                <CardHeader>
                  <CardTitle>{apartment.name}</CardTitle>
                  <CardDescription>Storage units</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Unit</TableHead>
                        <TableHead>Rent</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {apartment.units.map((unit, unitIndex) => (
                        <TableRow key={unitIndex}>
                          <TableCell>{unit.name}</TableCell>
                          <TableCell>€{unit.rent.toFixed(2)}</TableCell>
                          <TableCell>
                            {unit.status === "occupied" ? (
                              <Badge className="bg-red-500">Occupied</Badge>
                            ) : (
                              <Badge className={"bg-green-700"}>
                                Available
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <Button>View Details</Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
