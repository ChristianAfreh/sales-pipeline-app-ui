"use client";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Checkbox } from "./ui/checkbox";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useState } from "react";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";


const TodoList = () => {
    const [date,setDate] = useState<Date | undefined>(new Date());
    const [open,setOpen] = useState(false);
    return (
        <div>
            <h1 className="text-lg font-medium mb-6">Todo List</h1>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button className="w-full">
                        <CalendarIcon />
                        {date ? format(date,"PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-auto">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(date) => {
                                setDate(date)
                                setOpen(false);
                            }}   
                    />
                </PopoverContent>
            </Popover>
            {/* LIST */}
            <ScrollArea className="max-h-[400px] mt-4 overflow-y-auto p-2">
                <div className="flex flex-col gap-4">
                    {/* LIST ITEM */}
                    <Card className="p-4">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item1" />
                            <label htmlFor="item1" className="text-sm text-muted-foreground">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Voluptate, commodi.
                            </label>
                        </div>
                    </Card>
                    {/* LIST ITEM */}
                    <Card className="p-4">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item1" />
                            <label htmlFor="item1" className="text-sm text-muted-foreground">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Voluptate, commodi.
                            </label>
                        </div>
                    </Card>
                    {/* LIST ITEM */}
                    <Card className="p-4">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item1" />
                            <label htmlFor="item1" className="text-sm text-muted-foreground">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Voluptate, commodi.
                            </label>
                        </div>
                    </Card>
                    {/* LIST ITEM */}
                    <Card className="p-4">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item1" />
                            <label htmlFor="item1" className="text-sm text-muted-foreground">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Voluptate, commodi.
                            </label>
                        </div>
                    </Card>
                    {/* LIST ITEM */}
                    <Card className="p-4">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item1" />
                            <label htmlFor="item1" className="text-sm text-muted-foreground">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Voluptate, commodi.
                            </label>
                        </div>
                    </Card>
                    {/* LIST ITEM */}
                    <Card className="p-4">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item1" />
                            <label htmlFor="item1" className="text-sm text-muted-foreground">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Voluptate, commodi.
                            </label>
                        </div>
                    </Card>
                    {/* LIST ITEM */}
                    <Card className="p-4">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item1" />
                            <label htmlFor="item1" className="text-sm text-muted-foreground">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Voluptate, commodi.
                            </label>
                        </div>
                    </Card>
                    {/* LIST ITEM */}
                    <Card className="p-4">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item1" />
                            <label htmlFor="item1" className="text-sm text-muted-foreground">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Voluptate, commodi.
                            </label>
                        </div>
                    </Card>
                    {/* LIST ITEM */}
                    <Card className="p-4">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item1" />
                            <label htmlFor="item1" className="text-sm text-muted-foreground">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Voluptate, commodi.
                            </label>
                        </div>
                    </Card>
                    {/* LIST ITEM */}
                    <Card className="p-4">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item1" />
                            <label htmlFor="item1" className="text-sm text-muted-foreground">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Voluptate, commodi.
                            </label>
                        </div>
                    </Card>
                </div>
            </ScrollArea>
        </div>
    );
}


export default TodoList;