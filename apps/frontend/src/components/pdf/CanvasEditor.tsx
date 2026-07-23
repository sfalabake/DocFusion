'use client';

import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { usePDFEditorStore } from '@/stores/pdfEditorStore';
import {
  initializeFabricCanvas,
  setCanvasBackgroundImage,
  drawHighlight,
  drawTextAnnotation,
  drawPath,
  clearCanvas,
  removeSelected,
  setCanvasZoom,
  disposeFabricCanvas,
} from '@/lib/fabricUtils';
import clsx from 'clsx';

interface CanvasEditorProps {
  pdfPageImage: string;
  width: number;
  height: number;
  className?: string;
}

export const CanvasEditor: React.FC<CanvasEditorProps> = ({
  pdfPageImage,
  width,
  height,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

  const { selectedTool, annotations, addAnnotation, pageScale, setCanvasDrawing } =
    usePDFEditorStore();

  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingPath, setDrawingPath] = useState<Array<{ x: number; y: number }>>([]);

  // Initialize Fabric canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = initializeFabricCanvas(canvasRef.current, {
      width,
      height,
      backgroundColor: 'transparent',
    });

    fabricCanvasRef.current = fabricCanvas;

    // Set background image
    if (pdfPageImage) {
      setCanvasBackgroundImage(fabricCanvas, pdfPageImage).catch(console.error);
    }

    return () => {
      if (fabricCanvasRef.current) {
        disposeFabricCanvas(fabricCanvasRef.current);
      }
    };
  }, [pdfPageImage, width, height]);

  // Apply zoom
  useEffect(() => {
    if (fabricCanvasRef.current) {
      setCanvasZoom(fabricCanvasRef.current, pageScale);
    }
  }, [pageScale]);

  // Handle mouse down
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!fabricCanvasRef.current) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (selectedTool === 'draw') {
      setIsDrawing(true);
      setDrawingPath([{ x, y }]);
      setCanvasDrawing(true);
    } else if (selectedTool === 'highlight') {
      // Highlight will be completed on mouse up
      setIsDrawing(true);
      setDrawingPath([{ x, y }]);
    } else if (selectedTool === 'text') {
      // Text tool
      const text = prompt('Enter text:');
      if (text) {
        drawTextAnnotation(fabricCanvasRef.current, x, y, text);
        addAnnotation({
          id: Date.now().toString(),
          type: 'text',
          pageNumber: 1,
          content: text,
          coordinates: { x, y, width: text.length * 10, height: 20 },
          timestamp: new Date(),
          createdBy: 'user',
        });
      }
    }
  };

  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setDrawingPath((prev) => [...prev, { x, y }]);
  };

  // Handle mouse up
  const handleMouseUp = () => {
    if (!isDrawing || !fabricCanvasRef.current) return;

    if (selectedTool === 'draw' && drawingPath.length > 1) {
      drawPath(fabricCanvasRef.current, drawingPath);
      addAnnotation({
        id: Date.now().toString(),
        type: 'draw',
        pageNumber: 1,
        coordinates: {
          x: Math.min(...drawingPath.map((p) => p.x)),
          y: Math.min(...drawingPath.map((p) => p.y)),
          width: Math.max(...drawingPath.map((p) => p.x)) -
            Math.min(...drawingPath.map((p) => p.x)),
          height: Math.max(...drawingPath.map((p) => p.y)) -
            Math.min(...drawingPath.map((p) => p.y)),
        },
        timestamp: new Date(),
        createdBy: 'user',
      });
    } else if (selectedTool === 'highlight' && drawingPath.length > 0) {
      const startPoint = drawingPath[0];
      const endPoint = drawingPath[drawingPath.length - 1];

      const x = Math.min(startPoint.x, endPoint.x);
      const y = Math.min(startPoint.y, endPoint.y);
      const width = Math.abs(endPoint.x - startPoint.x);
      const height = Math.abs(endPoint.y - startPoint.y);

      drawHighlight(fabricCanvasRef.current, x, y, width, height);
      addAnnotation({
        id: Date.now().toString(),
        type: 'highlight',
        pageNumber: 1,
        coordinates: { x, y, width, height },
        color: 'rgba(255, 255, 0, 0.3)',
        timestamp: new Date(),
        createdBy: 'user',
      });
    }

    setIsDrawing(false);
    setDrawingPath([]);
    setCanvasDrawing(false);
  };

  // Handle delete key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' && fabricCanvasRef.current) {
        removeSelected(fabricCanvasRef.current);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={clsx(
        'border border-secondary-300 dark:border-secondary-700 cursor-crosshair',
        selectedTool === 'select' && 'cursor-pointer',
        selectedTool === null && 'cursor-default',
        className
      )}
      style={{
        touchAction: 'none',
        display: 'block',
      }}
    />
  );
};

export default CanvasEditor;
