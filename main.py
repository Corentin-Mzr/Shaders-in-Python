import moderngl_window as mglw


class App(mglw.WindowConfig):
    window_size = 1280, 720
    resource_dir = 'shaders'
    title = 'Shaders in Python - FPS: 0'

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

        # FPS
        self.fps_clock = 0
        self.fps = 0

        # Create screen aligned quad
        self.quad = mglw.geometry.quad_fs()

        # Load shader program
        self.prog = self.load_program(vertex_shader='vertex_shader.vert',
                                      fragment_shader='fragment_shader.frag')

        # Set uniforms
        self.set_uniform(u_name='resolution', u_value=self.window_size)

    def set_uniform(self, u_name, u_value):
        try:
            self.prog[u_name] = u_value
        except KeyError:
            print(f'Uniform {u_name} is not used in the shader')

    def render(self, time: float, frame_time):
        if time - self.fps_clock > 1.0:
            self.wnd.title = f'Shaders in Python - FPS: {self.fps}'
            self.fps = 0
            self.fps_clock = time
        else:
            self.fps += 1

        self.ctx.clear()
        self.set_uniform(u_name='time', u_value=time)
        self.quad.render(self.prog)


if __name__ == '__main__':
    mglw.run_window_config(App)
