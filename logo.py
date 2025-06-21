# import turtle

# # Set up the screen
# screen = turtle.Screen()
# screen.bgcolor("white")

# # Create a turtle object
# apple = turtle.Turtle()
# apple.speed(3)
# apple.width(5)

# # Function to draw a semicircle
# def draw_semicircle(radius, extent, direction):
#     if direction == "left":
#         apple.circle(radius, extent)
#     else:
#         apple.circle(-radius, extent)

# # Draw the apple logo
# apple.color("black")

# # Draw the upper part of the apple
# apple.penup()
# apple.goto(0, -100)
# apple.pendown()
# apple.setheading(90)
# draw_semicircle(100, 180, "left")

# # Draw the lower part of the apple
# apple.setheading(270)
# draw_semicircle(100, 180, "right")

# # Draw the leaf
# apple.penup()
# apple.goto(40, 80)
# apple.pendown()
# apple.setheading(90)
# apple.circle(20, 180)

# # Draw the stem
# apple.penup()
# apple.goto(0, 100)
# apple.pendown()
# apple.setheading(180)
# apple.forward(20)

# # Hide the turtle and display the result
# apple.hideturtle()
# turtle.done()


import turtle
import random
import math

# Set up the screen
screen = turtle.Screen()
screen.bgcolor("black")
screen.tracer(0)  # Disable automatic animation

# Create candle body
candle = turtle.Turtle()
candle.speed(0)
candle.color("#FFEEDD")  # Cream color
candle.penup()
candle.goto(-20, -200)
candle.pendown()
candle.begin_fill()
for _ in range(2):
    candle.forward(40)
    candle.left(90)
    candle.forward(300)
    candle.left(90)
candle.end_fill()

# Draw wick
candle.penup()
candle.goto(0, 100)
candle.color("black")
candle.pendown()
candle.setheading(90)
candle.forward(15)
candle.hideturtle()

# Create flame turtles
outer_flame = turtle.Turtle()
outer_flame.speed(0)
outer_flame.color("yellow")
outer_flame.penup()
outer_flame.hideturtle()

inner_flame = turtle.Turtle()
inner_flame.speed(0)
inner_flame.color("orange")
inner_flame.penup()
inner_flame.hideturtle()

# Animation variables
angle = 0
flame_height = 60

def draw_flame():
    global angle, flame_height
    
    # Calculate flame position with sine wave and random movement
    x_offset = math.sin(angle) * 3
    y_offset = math.cos(angle * 0.5) * 5 + flame_height
    angle += 0.15
    
    # Add random flicker
    x_offset += random.uniform(-2, 2)
    y_offset += random.uniform(-2, 2)
    
    # Draw outer flame
    outer_flame.clear()
    outer_flame.goto(x_offset, 100 + y_offset)
    outer_flame.dot(30)  # Yellow outer part
    
    # Draw inner flame
    inner_flame.clear()
    inner_flame.goto(x_offset, 105 + y_offset)
    inner_flame.dot(20)  # Orange inner part
    
    # Randomly change flame height
    flame_height += random.uniform(-0.5, 0.5)
    flame_height = max(50, min(70, flame_height))  # Keep within bounds
    
    screen.update()
    screen.ontimer(draw_flame, 50)

# Start animation
draw_flame()
turtle.done()
