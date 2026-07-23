import { fabric } from 'fabric';

export interface FabricCanvasOptions {
  width: number;
  height: number;
  backgroundColor?: string;
}

/**
 * Initialize Fabric canvas
 */
export function initializeFabricCanvas(
  element: HTMLCanvasElement,
  options: FabricCanvasOptions
): fabric.Canvas {
  const canvas = new fabric.Canvas(element, {
    width: options.width,
    height: options.height,
    backgroundColor: options.backgroundColor || '#ffffff',
    enableRetinaScaling: true,
    selection: true,
    preserveObjectStacking: true,
  });

  return canvas;
}

/**
 * Set canvas background image
 */
export function setCanvasBackgroundImage(
  canvas: fabric.Canvas,
  imageUrl: string | HTMLImageElement
): Promise<void> {
  return new Promise((resolve, reject) => {
    fabric.Image.fromURL(
      typeof imageUrl === 'string' ? imageUrl : imageUrl.src,
      (img) => {
        const scaledImage = img.scale(
          Math.min(
            canvas.width! / img.width!,
            canvas.height! / img.height!
          )
        );
        canvas.setBackgroundImage(scaledImage, () => {
          canvas.renderAll();
          resolve();
        });
      },
      { crossOrigin: 'anonymous' },
      { scaleX: 1, scaleY: 1 }
    );
  });
}

/**
 * Draw highlight annotation
 */
export function drawHighlight(
  canvas: fabric.Canvas,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string = 'rgba(255, 255, 0, 0.3)'
): fabric.Rect {
  const highlight = new fabric.Rect({
    left: x,
    top: y,
    width: height,
    height: height,
    fill: color,
    stroke: 'none',
    selectable: true,
    evented: true,
    data: { type: 'highlight' },
  });

  canvas.add(highlight);
  canvas.renderAll();
  return highlight;
}

/**
 * Draw text annotation
 */
export function drawTextAnnotation(
  canvas: fabric.Canvas,
  x: number,
  y: number,
  text: string,
  options: Partial<fabric.ITextOptions> = {}
): fabric.IText {
  const textObj = new fabric.IText(text, {
    left: x,
    top: y,
    fontSize: 16,
    fill: '#000000',
    fontFamily: 'Arial',
    editable: true,
    selectable: true,
    evented: true,
    data: { type: 'text' },
    ...options,
  });

  canvas.add(textObj);
  canvas.renderAll();
  return textObj;
}

/**
 * Draw freehand line/path
 */
export function drawPath(
  canvas: fabric.Canvas,
  points: Array<{ x: number; y: number }>,
  color: string = '#000000',
  strokeWidth: number = 2
): fabric.Path | null {
  if (points.length < 2) return null;

  // Convert points to SVG path string
  let pathString = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    pathString += ` L ${points[i].x} ${points[i].y}`;
  }

  const path = new fabric.Path(pathString, {
    stroke: color,
    strokeWidth,
    fill: 'transparent',
    selectable: true,
    evented: true,
    data: { type: 'draw' },
  });

  canvas.add(path);
  canvas.renderAll();
  return path;
}

/**
 * Clear canvas
 */
export function clearCanvas(canvas: fabric.Canvas): void {
  const bgImage = canvas.backgroundImage;
  canvas.clear();
  if (bgImage) {
    canvas.setBackgroundImage(bgImage, () => {
      canvas.renderAll();
    });
  }
}

/**
 * Remove selected objects
 */
export function removeSelected(canvas: fabric.Canvas): void {
  const activeObjects = canvas.getActiveObjects();
  activeObjects.forEach((obj) => canvas.remove(obj));
  canvas.discardActiveObject();
  canvas.renderAll();
}

/**
 * Export canvas as image
 */
export function exportCanvasAsImage(
  canvas: fabric.Canvas,
  format: 'png' | 'jpeg' = 'png'
): string {
  return canvas.toDataURL({
    format,
    quality: 1,
    multiplier: 2,
  });
}

/**
 * Export canvas as JSON
 */
export function exportCanvasAsJSON(canvas: fabric.Canvas): string {
  return JSON.stringify(canvas.toJSON());
}

/**
 * Import canvas from JSON
 */
export function importCanvasFromJSON(
  canvas: fabric.Canvas,
  json: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      canvas.loadFromJSON(json, () => {
        canvas.renderAll();
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Get canvas zoom ratio
 */
export function getCanvasZoom(canvas: fabric.Canvas): number {
  return canvas.getZoom();
}

/**
 * Set canvas zoom
 */
export function setCanvasZoom(canvas: fabric.Canvas, zoom: number): void {
  canvas.setZoom(Math.max(0.5, Math.min(zoom, 3)));
  canvas.renderAll();
}

/**
 * Fit canvas to container
 */
export function fitCanvasToContainer(
  canvas: fabric.Canvas,
  container: HTMLElement
): void {
  const rect = container.getBoundingClientRect();
  canvas.setWidth(rect.width);
  canvas.setHeight(rect.height);
  canvas.renderAll();
}

/**
 * Dispose of fabric canvas
 */
export function disposeFabricCanvas(canvas: fabric.Canvas): void {
  canvas.dispose();
}
