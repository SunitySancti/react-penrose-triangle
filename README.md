# react-penrose-triangle
Hi there! 👋 I'm excited to introduce you the customizable and controllable Penrose Triangle react component powered by ThreeJS and MobX.
[NPM PAGE](https://www.npmjs.com/package/react-penrose-triangle)  |  [GITHUB PAGE](https://github.com/SunitySancti/react-penrose-triangle)  |  [GUI](https://SunitySancti.github.io/penrose-triangle)
## Installation
via npm:
```
npm install --save react-penrose-triangle
```
or yarn:
```
yarn add react-penrose-triangle
```
## Usage
Using component is actually straightforward. You can make it in two general ways: uncontrollable and controllable 
### Uncontrollable
If you don't need to dynamically modificate the triangle configuration,
```JavaScript
import PenroseTriangle from 'react-penrose-triangle'
```
and then just use the component in your JSX or TSX like that:
```JavaScript
<PenroseTriangle {...initialConfig }/>
```
### Controllable
For advanced usage with dynamic control of triangle params, first of all,
```JavaScript
import { PenroseTriangle, usePenroseTriangle , observer } from 'react-penrose-triangle'
```
Then use your `initialConfig` in the hook instead using this in component props directly:
```JavaScript
const { props, config, controllers, geometry, material, light } = usePenroseTriangle(initialConfig)
```
After that, use `props` for instantiate PenroseTriangle component:
```JavaScript
<PenroseTriangle {...props }/>
```
And use other returned values to display config or control the triangle.
```TypeScript
config: {
  geometry: GeometryConfig,
  material: MaterialConfig,
  light: LightConfig
}
controllers: {  
  geometry: GeometryControllers,
  material: MaterialControllers,
  light: LightControllers
}
geometry: {
  config: GeometryConfig,
  controllers: GeometryControllers
}
material: {
  config: MaterialConfig,
  controllers: MaterialControllers
}
light: {
  config: LightConfig,
  controllers: LightControllers
}
```
## Interfaces
```TypeScript
interface GeometryConfig {
    cubesInSide: number;       // number of cubes in triangle side
    gapRatio: number;          // gap between cubes expressed in cube sizes, most sence in [0,1] range
    diameter: number;          // diameter of circumcircle expressed in container smaller sides
    rotation: number;          // angle of rotation in degrees clockwise
    rotationSpeed: number;     // speed of auto rotation in degrees per second
    isRotating: boolean;       // toggle auto rotation
    isInverted: boolean;       // direction of twist of the triangle geometry
}
interface MaterialConfig {
    color: string;             // any valid color value
}
interface LightConfig {
    elevation: number;         // z coordinate of light source, most sense in [0, 5] range
    rotation: number;          // rotation in degrees clockwise
    binding: false | number;   // bind light source to geometry: if false, it'll be used light.rotation for rotate light,
                               // if number, ignore light.rotation and use (geometry.rotation + light.binding) instead
    intensity: number;         // intensity of light source, most sense in [0, 25] range
    brightness: number;        // intensity of ambient light, most sense in [0, 2.5] range
}
interface GeometryControllers {
    setCubesInSide: (value: NumberLike) => void;
    setGapRatio: (value: NumberLike) => void;
    setDiameter: (value: NumberLike) => void;
    setRotation: (value: NumberLike) => void;
    rotate: (value: NumberLike) => void;
    setRotationSpeed: (value: NumberLike) => void;
    toggleAutoRotation: () => void;
    toggleRotationDirection: () => void;
    toggleGeometryInvertion: () => void;
}
interface MaterialControllers {
    setColor: (value: string) => void;
}
interface LightControllers {
    setRotation: (value: NumberLike) => void;
    setIntensity: (value: NumberLike) => void;
    setBrightness: (value: NumberLike) => void;
    setElevation: (value: NumberLike) => void;
    toggleBinding: () => void;
}
```
type `NnumberLike` means you can use strings like `0.123`, which can be parsed to number.
### Initial config
Whether you decide to use stupit or stateful component you have to use `initialConfig` for instantiation. Here is the valid type of it:
```TypeScript
interface InititialConfig {
    geometry?: Optional<GeometryConfig>,
    material?: Optional<MaterialConfig>,
    light?: Optional<LightConfig>,
}
```
* `Optional` means that you can use from zero to all options of specific config; the rest will be fallback to default values
### Default values
```JavaScript
const defaultValues = {
  geometry: {
    cubesInSide: 6,
    gapRatio: 0.25,
    diameter: 1,
    rotation: 0,
    rotationSpeed: 10,
    isRotating: true,
    isInverted: false
  },
  material: {
    color: '#bc2a9c'
  },
  light:{
    rotation: 0,
    binding: 50,
    elevation: 2.5,
    intensity: 12.5,
    brightness: 1.25
  }
}
```
You can import this if you need:

```JavaScript
import { defaultValues } from 'react-penrose-triangle'
```
___
Thanks for reading this documentation. Happy coding! 🎉
