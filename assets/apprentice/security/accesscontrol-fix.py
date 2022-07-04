class AccessControl:
  current_user = None
  ...
  def get_current_user(self):
    if self.current_user.deleted is None:
      return self.current_user
    else:
      raise Forbidden
