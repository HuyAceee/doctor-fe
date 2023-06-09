/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ReactDOM from "react-dom";
import "index.css";
import { WhatsappIcon } from "assets/icons";

interface IPosition {
  x: number;
  y: number;
}

interface IContextMenuItem {
  name: string;
  icon: string;
}

interface ContextMenuItemProps {
  index: number;
  name: string;
  icon: string;
  active: boolean;
  position: IPosition;
  offset: IPosition;
}

const ContextMenuItem: React.FC<ContextMenuItemProps> = (
  props: ContextMenuItemProps
) => {
  const [active, setActive] = React.useState<boolean>(false),
    [visible, setVisible] = React.useState<boolean>(false),
    [position, setPosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    if (props.active) {
      setActive(props.active);
      setPosition({ x: props.position.x, y: props.position.y });
      setTimeout(() => setVisible(true), 50);
    } else {
      setVisible(false);
      setTimeout(() => setActive(false), 350);
    }
  }, [props.active]);

  React.useEffect(() => {
    setPosition({ x: props.position.x, y: props.position.y });
  }, [props.position]);

  if (active) {
    const getStyles = (): React.CSSProperties => {
      const left: number = visible ? position.x + props.offset.x : position.x,
        opacity: number = visible ? 1 : 0,
        top: number = visible ? position.y + props.offset.y : position.y;

      return {
        left: `${left}px`,
        opacity,
        top: `${top}px`,
        transition: "all",
        transitionDelay: `${props.index * 50}ms`,
      };
    };

    return ReactDOM.createPortal(
      <button
        type="button"
        className="context-menu-item absolute"
        style={getStyles()}
      >
        <WhatsappIcon width={40} height={40} />
      </button>,
      document.getElementById("app") as any
    );
  }

  return null;
};

const MenuRight = () => {
  const [active, setActive] = React.useState<boolean>(false),
    [position, setPosition] = React.useState({ x: 0, y: 0 });

  const [menuRadius, setMenuRadius] = React.useState<number>(100),
    [itemRadius, setItemRadius] = React.useState<number>(25);

  const [contextMenuItems, setContextMenuItems] = React.useState<any>([]);

  React.useEffect(() => {
    // Only for CodePen preview
    setTimeout(() => {
      const centerX: number = window.innerWidth / 2 - menuRadius / 4,
        centerY: number = window.innerHeight / 3 - menuRadius / 4;

      setPosition({ x: centerX, y: centerY });

      // setActive(true);
    }, 500);
  }, []);

  React.useEffect(() => {
    setContextMenuItems([
      { name: "Cut", icon: "fas fa-cut" },
      { name: "Copy", icon: "far fa-copy" },
      { name: "Paste", icon: "fas fa-paste" },
      { name: "Comment", icon: "far fa-comment" },
      { name: "Like", icon: "far fa-thumbs-up" },
      { name: "Delete", icon: "fas fa-trash" },
    ]);
  }, []);

  React.useEffect(() => {
    const handleClick = (e: any): void => {
      const items = document.getElementsByClassName("context-menu-item");

      if (items && items.length > 0) {
        let count: number = 0;

        for (let i = 0; i < items.length; i++) {
          if (items[i].contains(e.target)) {
            count++;
          }
        }

        if (count === 0) {
          setActive(false);
        }
      } else {
        setActive(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleOnContextMenu = (e: any): void => {
    e.preventDefault();
    setActive(true);

    // Added some barriers for the menu position so it doesnt extend off the screen
    const x: number = Math.min(
        Math.max(menuRadius + 10, e.clientX - itemRadius),
        window.innerWidth - menuRadius * 1.5 - 10
      ),
      y: number = Math.min(
        Math.max(menuRadius + 10, e.clientY - itemRadius),
        window.innerHeight - menuRadius * 1.5 - 10
      );

    setPosition({ x, y });
  };

  const getContextMenuItems = (): JSX.Element[] => {
    const getOffset = (index: number) => {
      const step: number = (2 * Math.PI) / contextMenuItems.length,
        angle: number = index * step;

      const x: number = Math.round(
          menuRadius +
            menuRadius * Math.cos(angle) -
            itemRadius -
            (menuRadius - itemRadius)
        ),
        y: number = Math.round(
          menuRadius +
            menuRadius * Math.sin(angle) -
            itemRadius -
            (menuRadius - itemRadius)
        );

      return { x, y };
    };

    return contextMenuItems.map((item: IContextMenuItem, index: number) => {
      return (
        <ContextMenuItem
          key={item.name}
          index={index}
          name={item.name}
          icon={item.icon}
          active={active}
          position={position}
          offset={getOffset(index)}
        />
      );
    });
  };
  return (
    <div
      id="app"
      className="h-screen w-screen absolute"
      onContextMenu={handleOnContextMenu}
    >
      {getContextMenuItems()}
      <div id="instructions"></div>
    </div>
  );
};

export default MenuRight;
